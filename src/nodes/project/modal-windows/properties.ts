import ModalWindow from '../../../ui/modal-window';
import FormUiNode from '../../../ui/html/form';
import FieldsetUiNode from '../../../ui/html/fieldset';
import LegendUiNode from '../../../ui/html/legend';
import ModalWindowControl from '../../../ui/modal-window/controls/control';
import ControlUiNode from '../../../ui/control';
import TextInputUiNode from '../../../ui/html/input/text';
import TextAreaUiNode from '../../../ui/html/textarea';

export type Fields = {
  id: string;
  name: string;
  description: string;
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

  private readonly fieldName: TextInputUiNode = new TextInputUiNode()
    .uiNodeAppendTo(new ControlUiNode('Name').uiNodeAppendTo(this.fieldset).labelUiNode);

  private readonly fieldDescription: TextAreaUiNode = new TextAreaUiNode()
    .uiNodeAppendTo(new ControlUiNode('Description').uiNodeAppendTo(this.fieldset).labelUiNode);

  constructor() {
    super();
    this.fieldId.uiNodeElement.readOnly = true;
  }

  public open(fields: Fields, callback: (fields?: Fields) => void): void {
    this.title = `Project ${fields.name}`;
    this.fieldId.value = fields.id;
    this.fieldName.value = fields.name;

    this.controls.uiNodeRemoveAll();
    this.controls.uiNodeAppendAll([
      new ModalWindowControl('Apply', () => {
        this.hide();
        callback({
          id: fields.id,
          name: this.fieldName.value.trim(),
          description: this.fieldDescription.value.trim()
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
