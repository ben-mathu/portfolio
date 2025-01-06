export abstract class BaseComponent<Type> {
  selectedRow: Type | undefined;

  abstract getData(): void

  onDelete() {
    this.selectedRow = undefined;
  }

  updateUi(updateValue: { event: Event }) {
    this.getData();
  }
}
