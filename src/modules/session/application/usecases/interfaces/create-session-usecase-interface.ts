import { ICreateSessionDTO } from '../dtos/create-session-dto';
import { IOutputSessionDTO } from '../dtos/output-session-dto';

export interface ICreateSessionUseCase {
  execute(input: ICreateSessionDTO): Promise<IOutputSessionDTO>;
}
