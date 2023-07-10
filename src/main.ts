import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
			.setTitle('NEST CQRS API')
			.setDescription('Nest CQRS API description')
			.setVersion('0.1')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);

		SwaggerModule.setup('/api/docs', app, document);

  await app.listen(4000);
}
bootstrap();
