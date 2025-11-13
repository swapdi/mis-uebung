/**
 * @author Jörn Kreutel
 */
import { mwf } from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";
const imgs = [
  "https://picsum.photos/50/100",
  "https://picsum.photos/100/200",
  "https://picsum.photos/200/100",
  "https://picsum.photos/300/200",
  "https://picsum.photos/200/300",
  "https://picsum.photos/400/300",
  "https://picsum.photos/300/400",
  "https://picsum.photos/500/400",
  "https://picsum.photos/400/500",
  "https://picsum.photos/600/500",
];
export default class ListViewController extends mwf.ViewController {
  // instance attributes set by mwf after instantiation
  args;
  root;

  // TODO-REPEATED: declare custom instance attributes for this controller
  /*
   * for any view: initialise the view
   */
  async oncreate() {
    // TODO: do databinding, set listeners, initialise the view

    this.addListener(
      new mwf.EventMatcher("crud", "created", "MediaItem"),
      (evt) => {
        this.addToListview(evt.data);
      }
    );
    this.addListener(
      new mwf.EventMatcher("crud", "updated", "MediaItem"),
      (evt) => {
        this.updateInListview(evt.data._id, evt.data);
      }
    );
    this.addListener(
      new mwf.EventMatcher("crud", "deleted", "MediaItem"),
      (evt) => {
        this.removeFromListview(evt.data);
      }
    );

    this.root.querySelector("#myapp-addNewItem").onclick = () => {
      const newItem = this.createRandomObject();
      newItem.title = "";
      this.showDialog("myapp-mediaItemDialog", {
        item: newItem,
        actionBindings: {
          submitForm: (evt) => {
            evt.original.preventDefault();
            newItem.create();
            this.hideDialog();
          },
        },
      });
    };

    entities.MediaItem.readAll().then((items) => {
      items.forEach((item) => {
        if (item.srcImg) {
          item.src = URL.createObjectURL(item.srcImg);
        }
      });
      this.initialiseListview(items);
    });

    // call the superclass once creation is done
    super.oncreate();
  }

  constructor() {
    super();

    console.log("ListViewController()");
  }

  /*
   * for views that initiate transitions to other views
   * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
   */
  async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
    // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
    if (returnStatus === "itemDeleted") {
      this.removeFromListview(returnValue.item._id);
    }
  }

  /*
   * for views with listviews: react to the selection of a listitem
   * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
   */
  onListItemSelected(itemobj, listviewid) {
    this.nextView("myapp-readview", { item: itemobj });

    // TODO: implement how selection of itemobj shall be handled
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
  createRandomObject() {
    const randomPosTitle = Math.floor(Math.random() * 10);
    const randomPosImg = Math.floor(Math.random() * 1000000);

    const mediaItem = new entities.MediaItem(
      `Title ${randomPosTitle}`,
      imgs[randomPosImg % imgs.length]
    );
    return mediaItem;
  }

  //custom Methods
  editItem(item) {
    this.showDialog("myapp-mediaItemDialog", {
      item: item,
      actionBindings: {
        submitForm: (evt) => {
          evt.original.preventDefault();
          item.update();
          this.hideDialog();
        },
        deleteItem: () => {
          item.delete();
          this.hideDialog();
        },
      },
    });
  }

  deleteItem(item) {
    item.delete();
  }
}
