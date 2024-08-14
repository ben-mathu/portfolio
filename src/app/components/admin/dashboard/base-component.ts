export class BaseComponent<Type> {
  selectedRow: Type | undefined;

  onDelete() {
    this.selectedRow = undefined;
  }
}
