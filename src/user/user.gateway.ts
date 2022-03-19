/* eslint-disable */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UserService } from './user.service';

interface JoinedUser {
  user_id: string,
  email: string,
  test_id: string,
  mode: string,
  question: string,
  timer: Number
}

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService){}
  
  @SubscribeMessage('test_now')
  handleMessage(client: any, payload: JoinedUser) {

    if (payload.mode === 'join') {
      client.emit('test_now', {'msg':`${payload.email} подключился к тесту #${payload.test_id}`});
    }
    if (payload.timer >= 1800) {
      client.emit('test_now', {'msg':`${payload.email} #${payload.test_id}`,'tag':'slowpoke'});
      this.userService.updateTestHistory('slowpoke',payload.user_id)
    }
  }
}
