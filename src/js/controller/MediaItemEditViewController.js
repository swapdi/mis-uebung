/**
 * @author Jörn Kreutel
 */
import { GenericDialogTemplateViewController } from "vfh-iam-mwf-base";

export default class MediaItemEditViewController extends GenericDialogTemplateViewController {
  args;
  root;

  constructor() {
    super();

    console.log("MediaItemEditViewController()");
  }

  async onresume() {
    // call the superclass once creation is done
    super.onresume();

    this.root.viewProxy.bindAction("imgsrcSelected", (evt) => {
      const file = evt.original.target.files[0];
      this.args.item.title = file.name;
      this.args.item.src = URL.createObjectURL(file);
      this.args.item.srcImg = file;
      this.root.viewProxy.update(this.args);
    });
  }
}
