import ModalWindow from '../../ui/modal-window';
import FormUiNode from '../../ui/html/form';
import FieldsetUiNode from '../../ui/html/fieldset';
import LegendUiNode from '../../ui/html/legend';
import TextInputUiNode from '../../ui/html/input/text';
import ControlUiNode from '../../ui/control';
import ModalWindowControl from '../../ui/modal-window/controls/control';

export type Fields = {
  id: string;
  name: string;
  version: string;
};

export default class PropertiesModalWindow extends ModalWindow {
  private readonly form: FormUiNode = new FormUiNode()
    .uiNodeAppendTo(this.content);

  private readonly fieldset: FieldsetUiNode = new FieldsetUiNode()
    .uiNodeAppendTo(this.form);

  private readonly legend: LegendUiNode = new LegendUiNode('Properties')
    .uiNodeAppendTo(this.fieldset);

  private readonly fieldId: TextInputUiNode = new TextInputUiNode()
    .uiNodeAppendTo(new ControlUiNode('ID').uiNodeAppendTo(this.fieldset).labelUiNode);

  public open(fields: Fields, callback: (fields?: Fields) => void): void {
    this.title = `Package "${fields.name}"`;
    this.fieldId.value = fields.id;

    this.controls.uiNodeRemoveAll();
    this.controls.uiNodeAppendAll([
      new ModalWindowControl('Apply', () => {
        this.hide();
        callback({
          id: fields.id,
          name: '', //this.fieldName.value.trim(),
          version: '', //this.fieldDescription.value.trim()
        });
      }),
      new ModalWindowControl('Cancel', () => {
        this.hide();
        callback();
      })
    ]);

    this.show();
  }
}
