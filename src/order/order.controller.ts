import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response, NextFunction } from 'express';
const paypal = require('paypal-rest-sdk');

@Controller()
export class OrderController {
  constructor(
    @Inject('ORDER_MICROSERVICE')
    private readonly order_client: ClientProxy,
    private readonly orderService: OrderService,
  ) {}

  @Get('get_order')
  findAll(req:Request,res:Response) {
    var payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://127.0.0.1:3000/success',
        cancel_url: 'http://127.0.0.1:3000/err',
      },
      transactions: [
        {
          amount: {
            total: 39.0,
            currency: 'USD',
          },
          description: ' a book on mean stack ',
        },
      ],
    };


    const createPay = (payment) => {
      console.log("payment",payment)
      return new Promise((resolve, reject) => {
        paypal.payment.create(payment, function (err, payment) {
          if (err) {
            reject(err);
          } else {
            resolve(payment);
          }
        });
      });
    };

    createPay(payment)
      .then((transaction: any) => {
        console.log("data",transaction)
        var id = transaction.id;
        var links = transaction.links;
        var counter = links.length;
        while (counter--) {
          if (links[counter].method == 'REDIRECT') {
            console.log(links[counter].href)
            // redirect to paypal where user approves the transaction
            return res.redirect(links[counter].href);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/err');
      });

    // return this.order_client.send({ cmd: 'get_order' }, {});
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
