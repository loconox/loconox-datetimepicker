import {EventEmitter} from "@angular/core";
import {Moment} from "moment";

export interface ValueChangeSubscriber {
  _valueChange: EventEmitter<Moment | null>;
}
