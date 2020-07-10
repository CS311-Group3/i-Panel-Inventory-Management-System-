import { element, by, ElementFinder } from 'protractor';

export class ReturnsDataComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-returns-data div table .btn-danger'));
  title = element.all(by.css('jhi-returns-data div h2#page-heading span')).first();
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

export class ReturnsDataUpdatePage {
  pageTitle = element(by.id('jhi-returns-data-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateOfReturnInput = element(by.id('field_dateOfReturn'));

  salesCodeSelect = element(by.id('field_salesCode'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setDateOfReturnInput(dateOfReturn: string): Promise<void> {
    await this.dateOfReturnInput.sendKeys(dateOfReturn);
  }

  async getDateOfReturnInput(): Promise<string> {
    return await this.dateOfReturnInput.getAttribute('value');
  }

  async salesCodeSelectLastOption(): Promise<void> {
    await this.salesCodeSelect.all(by.tagName('option')).last().click();
  }

  async salesCodeSelectOption(option: string): Promise<void> {
    await this.salesCodeSelect.sendKeys(option);
  }

  getSalesCodeSelect(): ElementFinder {
    return this.salesCodeSelect;
  }

  async getSalesCodeSelectedOption(): Promise<string> {
    return await this.salesCodeSelect.element(by.css('option:checked')).getText();
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

export class ReturnsDataDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-returnsData-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-returnsData'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
