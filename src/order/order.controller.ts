import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderQueryDto, MakePaymentQueryDto} from "./dto";

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {
    }

    @Post()
    create(@Query() createOrderQuery: CreateOrderQueryDto) {
        return this.orderService.create(createOrderQuery.userId);
    }

    @Post('payment')
    makePayment(@Body() makePaymentDto: MakePaymentQueryDto) {
        return this.orderService.makePayment(makePaymentDto)
    }

    @Get('deliveryInfo')
    getDeliveryInfo(@Query() deliveryInfoQuery: CreateOrderQueryDto) {
        return this.orderService.getDeliveryInfo(deliveryInfoQuery.userId);
    }

    @Get(':orderId')
    getOne(@Param('orderId') orderId: number) {
        return this.orderService.getOne(orderId);
    }

    @Get()
    getAll() {
        return this.orderService.getAll();
    }
}
