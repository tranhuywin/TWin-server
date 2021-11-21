import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create(createOrderDto);
    order.createdAt = new Date();
    order.updatedAt = new Date();

    createOrderDto.orderItems.map(async item => {
      const product = await this.productService.findOne(item.productId);
      if (item.quantity > product.quantity) {
        throw new BadRequestException('Product quantity is not enough');
      }
      this.productService.updatebyidProduct(item.productId, { quantity: product.quantity - item.quantity });
    })
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'items')
      .where('order.id = :id', { id: id })
      .getOne();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  update(id: number, _updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number): Promise<IStatusResult> {
    await this.findOne(id);
    const deleteData = await this.orderRepository.delete(id);
    if (deleteData.affected) {
      const result: IStatusResult = { status: 'success' };
      return result;
    }
    else {
      throw new BadRequestException('Remove failed');
    }
  }
}
