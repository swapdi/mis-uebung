/**
 * @author Jörn Kreutel
 */
import { mwf } from "vfh-iam-mwf-base";

export default class ReadViewController extends mwf.ViewController {
  // instance attributes set by mwf after instantiation
  args;
  root;
  // TODO-REPEATED: declare custom instance attributes for this controller

  /*
   * for any view: initialise the view
   */
  async oncreate() {
    // TODO: do databinding, set listeners, initialise the view

    const myItem = this.args.item;

    const viewProxy = this.bindElement(
      "myapp-readview-template",
      { item: myItem },
      this.root
    ).viewProxy;

    viewProxy.bindAction("deleteItem", () =>
      myItem.delete().then(() => {
        this.previousView();
      })
    );

    // call the superclass once creation is done
    super.oncreate();
  }

  constructor() {
    super();

    console.log("ReadViewController()");
  }

  /*
   * for views that initiate transitions to other views
   * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
   */
  async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
    // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
  }

  /*
   * for views with dialogs
   * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
   */
  bindDialog(dialogid, dialogview, dialogdataobj) {
    // call the supertype function
    super.bindDialog(dialogid, dialogview, dialogdataobj);

    // TODO: implement action bindings for dialog, accessing dialog.root
  }
}
