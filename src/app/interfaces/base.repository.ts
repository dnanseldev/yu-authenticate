export default interface ICommumRepository<T> {
  Create(item: T): Promise<void>;
  Update(id: string, item: T): Promise<void>;
  Delete(id: string): Promise<void>;
  Find(item: T): Promise<T[]>;
  FindOne(id: string): Promise<T>;
  FindAll(): Promise<T[]>;
}
