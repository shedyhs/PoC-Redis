import { randomUUID } from 'crypto';
import { IJobKeyGateway } from './job-key-gateway-interface';

export class JobKeyGateway implements IJobKeyGateway {
  generate(): string {
    return randomUUID();
  }
}
