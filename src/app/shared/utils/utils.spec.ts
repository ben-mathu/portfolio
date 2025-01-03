import { inject } from "@angular/core";
import { Utils } from "./utils";
import { TestBed } from "@angular/core/testing";

describe('Utils', () =>{
    let utils: Utils;
    beforeEach(async () => {
      TestBed.configureTestingModule({});
      utils = TestBed.inject(Utils);
    });

    it('format date to yyyy-MM-dd', () => {
      expect(utils.formatDate(new Date())).toMatch(/[\w-]{10}/);
    });
});
