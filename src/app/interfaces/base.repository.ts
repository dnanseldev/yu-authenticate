export default interface ICommumRepository<T> {
  Create(item: T | Partial<T>): Promise<T | Partial<T>>;
  Update(id: string, item: T): Promise<void>;
  Delete(id: string): Promise<void>;
  Find(item: T): Promise<T[]>;
  FindOne(field: string): Promise<T | Partial<T>>;
  FindById(id: string): Promise<T | Partial<T>>;
  FindAll(): Promise<T[]>;
}
