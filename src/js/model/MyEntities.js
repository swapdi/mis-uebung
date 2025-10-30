/**
 * @author Jörn Kreutel
 *
 * this skript defines the data types used by the application and the model operations for handling instances of the latter
 */

import { EntityManager } from "vfh-iam-mwf-base";

/*************
 * example entity
 *************/

export class MyEntity extends EntityManager.Entity {
  // TODO-REPEATED: declare entity instance attributes

  constructor() {
    super();
  }
}

// TODO-REPEATED: add new entity class declarations here

export class MediaItem extends EntityManager.Entity {
  title;
  src;
  contentType;
  added = Date.now();
  description = "";

  constructor(title, src) {
    super();
    this.title = title;
    this.src = src;
  }
}
