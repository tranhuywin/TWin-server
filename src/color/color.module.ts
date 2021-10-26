import { forwardRef, Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { MemoryModule } from 'src/memory/memory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Color]), forwardRef(()=> MemoryModule)],
  controllers: [ColorController],
  providers: [ColorService],
  exports:[ColorService]
})
export class ColorModule {}
