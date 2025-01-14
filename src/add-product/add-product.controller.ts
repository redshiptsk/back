import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddProductService } from "./add-product.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("add-product")
export class AddProductController {
  constructor(private readonly addProductService: AddProductService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          try {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          } catch (e) {
            console.log(e);
          }
        },
      }),
    })
  )
  async addProduct(
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: CreateProductDto
  ) {
    console.log("Received file:", photo);
    console.log("Body:", body);

    await this.addProductService.create(body, photo);

    const allProducts = await this.addProductService.findAll();

    return {
      message: "Product added successfully",
      products: allProducts,
    };
  }
}
