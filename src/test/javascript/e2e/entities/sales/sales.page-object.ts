import { element, by, ElementFinder } from 'protractor';

export class SalesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sales div table .btn-danger'));
  title = element.all(by.css('jhi-sales div h2#page-heading span')).first();
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

export class SalesUpdatePage {
  pageTitle = element(by.id('jhi-sales-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  totalInput = element(by.id('field_total'));
  serviceChargesInput = element(by.id('field_serviceCharges'));
  dateOfSaleInput = element(by.id('field_dateOfSale'));

  customerIDSelect = element(by.id('field_customerID'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTotalInput(total: string): Promise<void> {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput(): Promise<string> {
    return await this.totalInput.getAttribute('value');
  }

  async setServiceChargesInput(serviceCharges: string): Promise<void> {
    await this.serviceChargesInput.sendKeys(serviceCharges);
  }

  async getServiceChargesInput(): Promise<string> {
    return await this.serviceChargesInput.getAttribute('value');
  }

  async setDateOfSaleInput(dateOfSale: string): Promise<void> {
    await this.dateOfSaleInput.sendKeys(dateOfSale);
  }

  async getDateOfSaleInput(): Promise<string> {
    return await this.dateOfSaleInput.getAttribute('value');
  }

  async customerIDSelectLastOption(): Promise<void> {
    await this.customerIDSelect.all(by.tagName('option')).last().click();
  }

  async customerIDSelectOption(option: string): Promise<void> {
    await this.customerIDSelect.sendKeys(option);
  }

  getCustomerIDSelect(): ElementFinder {
    return this.customerIDSelect;
  }

  async getCustomerIDSelectedOption(): Promise<string> {
    return await this.customerIDSelect.element(by.css('option:checked')).getText();
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

export class SalesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sales-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sales'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
