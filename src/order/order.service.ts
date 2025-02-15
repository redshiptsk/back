import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {EOrderStatus, Order, OrderItem, Payment} from "./entities";
import {CartService} from "../cart/services/cart.service";
import {Sequelize} from "sequelize-typescript";
import {UsersService} from "../users/services/users.service";
import {MakePaymentQueryDto} from "./dto";
import {DeliveryInfoDto} from "./dto/delivery-info";
import {v4 as uuid} from 'uuid';
import { ChatService } from '../chat/services/chat.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
        @InjectModel(OrderItem)
        private orderItemModel: typeof OrderItem,
        private readonly chatService: ChatService,
        @InjectModel(Payment)
        private paymentModel: typeof Payment,
        private readonly cartService: CartService,
        private readonly usersService: UsersService,
        private readonly sequelize: Sequelize,
        
    ) {
    }

    async create(userId: number) {
        try {
            const cart = await this.cartService.getCart(userId);

            const orderId = await this.sequelize.transaction(async transaction => {
                const user = await this.usersService.findOne(userId);

                const order = await this.orderModel.create({
                    deliveryAddress: user.deliveryAddress,
                    status: EOrderStatus.processing,
                }, {transaction});

                let totalAmount = 0;
                for (const cartItem of cart) {
                    const sellerId = cartItem.product.sellerId;
                    totalAmount += cartItem.product.price * cartItem.quantity;

                    await this.orderItemModel.create({
                        orderId: order.id,
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        price: cartItem.product.price,
                    }, {transaction})

                    await this.chatService.saveMessage({
                        text: `Order ${order.id} created with product ${cartItem.product.name}`,
                        roomId: `${user.id}_${sellerId}`,
                        senderId: user.id,    
                    });
                    await this.chatService.saveMessage({
                        text: `Order ${order.id} affirmed with product ${cartItem.product.name}`,
                        roomId: `${user.id}_${sellerId}`,
                        senderId: sellerId,    
                    });
                }

                await order.update({
                    deliveryPrice: (await this.getDeliveryInfo(userId)).deliveryValue,
                    totalAmount,
                }, {transaction});
                await this.cartService.clearCart(userId, transaction);

                return order.id;
            });

            return this.orderModel.findByPk(orderId, {
                include: [OrderItem, Payment],
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(orderId: number) {
        const order = await this.orderModel.findByPk(orderId, {
            include: [OrderItem, Payment]
        })

        if (!order) {
            throw new NotFoundException();
        }

        return order;
    }

    async getAll() {
        return this.orderModel.findAll({
            include: [OrderItem, Payment]
        })
    }

    async makePayment({orderId, method}: MakePaymentQueryDto) {
        try {
            const paymentId = await this.sequelize.transaction(async transaction => {
                const order = await this.orderModel.findByPk(orderId);
                await order.update({status: EOrderStatus.payment}, {transaction});

                const payment = await this.paymentModel.create({
                    orderId,
                    method,
                    transaction: uuid(),
                }, {transaction});

                await order.update({status: EOrderStatus.accepted}, {transaction});

                return payment.id;
            })

            return this.paymentModel.findByPk(paymentId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDeliveryInfo(userId: number): Promise<DeliveryInfoDto> {
        const user = await this.usersService.findOne(userId);
        const cart = await this.cartService.getCart(userId);

        if (!user.deliveryAddress) {
            return {
                deliveryAddress: user.deliveryAddress,
                deliveryTime: null,
                retentionPeriod: null,
                deliveryValue: null,
            }
        }

        const totalAmount = cart.reduce(
            (prev, current) =>
                prev + current.product.price * current.quantity, 0
        );

        return {
            deliveryAddress: user.deliveryAddress,
            deliveryTime: Math.ceil((totalAmount / 100 + 1) / 10),
            retentionPeriod: 14,
            deliveryValue: +(totalAmount * 0.05).toFixed(2),
        };
    }
}
