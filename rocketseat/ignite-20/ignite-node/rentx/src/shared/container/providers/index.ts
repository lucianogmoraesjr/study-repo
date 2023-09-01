import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { GmailMailProvider } from './MailProvider/implementations/GmailMailProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
container.registerInstance<IMailProvider>(
  'MailProvider',
  new GmailMailProvider(),
);

const storage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[process.env.STORAGE],
);
