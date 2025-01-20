import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as express from 'express';
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.CLIENT_HOST ?? 'http://localhost:5174',
        methods: 'GET, POST, PUT, PATCH, DELETE',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Sputnik')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
