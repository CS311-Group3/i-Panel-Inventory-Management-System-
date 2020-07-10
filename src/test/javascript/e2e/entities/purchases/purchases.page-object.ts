import { element, by, ElementFinder } from 'protractor';

export class PurchasesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-purchases div table .btn-danger'));
  title = element.all(by.css('jhi-purchases div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class PurchasesUpdatePage {
  pageTitle = element(by.id('jhi-purchases-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  totalInput = element(by.id('field_total'));
  discountsInput = element(by.id('field_discounts'));
  dateOfPurchaseInput = element(by.id('field_dateOfPurchase'));

  vendorIDSelect = element(by.id('field_vendorID'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTotalInput(total: string): Promise<void> {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput(): Promise<string> {
    return await this.totalInput.getAttribute('value');
  }

  async setDiscountsInput(discounts: string): Promise<void> {
    await this.discountsInput.sendKeys(discounts);
  }

  async getDiscountsInput(): Promise<string> {
    return await this.discountsInput.getAttribute('value');
  }

  async setDateOfPurchaseInput(dateOfPurchase: string): Promise<void> {
    await this.dateOfPurchaseInput.sendKeys(dateOfPurchase);
  }

  async getDateOfPurchaseInput(): Promise<string> {
    return await this.dateOfPurchaseInput.getAttribute('value');
  }

  async vendorIDSelectLastOption(): Promise<void> {
    await this.vendorIDSelect.all(by.tagName('option')).last().click();
  }

  async vendorIDSelectOption(option: string): Promise<void> {
    await this.vendorIDSelect.sendKeys(option);
  }

  getVendorIDSelect(): ElementFinder {
    return this.vendorIDSelect;
  }

  async getVendorIDSelectedOption(): Promise<string> {
    return await this.vendorIDSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PurchasesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-purchases-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-purchases'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
