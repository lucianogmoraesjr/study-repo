import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: IUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe('Show User Profile Use Case', () => {
 beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository()
  showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
 });

 it('should be able to show an user profile', async () => {
  const user = await inMemoryUsersRepository.create({
    name: 'John',
    email: 'john@mail.com',
    password: '123456'
  });

  const userProfile = await showUserProfileUseCase.execute(user.id as string);

  expect(userProfile).toEqual(user);
 });

 it('should not be able to show an inexistent user profile', async () => {

  await expect(showUserProfileUseCase.execute('inexistent-id'))
  .rejects
  .toBeInstanceOf(ShowUserProfileError);
 });
});
