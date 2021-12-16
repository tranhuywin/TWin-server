import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorService } from 'src/color/color.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemsRepository: Repository<OrderItem>,
        private readonly colorService: ColorService,
        private readonly userService: UserService
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        //check user
        const user = await this.userService.findOne(createOrderDto.userId);
        let totalPrice: number = 0;
        let totalOriginalPrice: number = 0;
        const order = await this.orderRepository.create(createOrderDto);
        order.createdAt = new Date();
        order.updatedAt = new Date();
        order.user = user;
        //order items
        const orderItems = await createOrderDto.orderItems.map(async item => {
            const orderItem = await this.orderItemsRepository.create(item);
            orderItem.order = order;

            const color = await this.colorService.findOne(item.colorId);
            //calculate total price
            totalPrice += color.price * item.quantity; 
            totalOriginalPrice += color.originalPrice * item.quantity;

            if (item.quantity > color.quantity) {
                throw new BadRequestException('Color of product quantity is not enough');
            }
            orderItem.color = color;
            await this.colorService.update(color.id, { quantity: color.quantity - item.quantity });
            return orderItem;
        });
        
        const orderItemsSave = await Promise.all(orderItems);
        order.totalPrice = totalPrice;
        order.totalOriginalPrice = totalOriginalPrice;
        const orderData = await this.orderRepository.save(order)

        await this.orderItemsRepository.save(orderItemsSave);
        return orderData;
    }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.orderItems', 'items')
            .leftJoinAndSelect('items.color', 'color')
            .where('order.id = :id', { id: id })
            .getOne();
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<IStatusResult> {
        const updateData = await this.orderRepository.update(id, updateOrderDto);
        if (updateData.affected) {
            return {
                status: 'success',
            };
        }
        else {
            throw new NotFoundException('Order update failed');
        }
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

    async analytics(year: number): Promise<any> {
            let ResultAnalytics: any = [];
            for(let i = 1; i <= 12; i++) {
                ResultAnalytics.push({month: i, totalPrice: 0, totalOriginalPrice: 0});
            }

        const orders = await this.orderRepository.find();

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            if (date.getFullYear() == year) {
                ResultAnalytics[date.getMonth()].totalPrice += order.totalPrice;
                ResultAnalytics[date.getMonth()].totalOriginalPrice = order.totalOriginalPrice;
            }
        });
        return ResultAnalytics;
  }
}
