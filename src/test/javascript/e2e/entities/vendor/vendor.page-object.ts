import { element, by, ElementFinder } from 'protractor';

export class VendorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vendor div table .btn-danger'));
  title = element.all(by.css('jhi-vendor div h2#page-heading span')).first();
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

export class VendorUpdatePage {
  pageTitle = element(by.id('jhi-vendor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  vendorNameInput = element(by.id('field_vendorName'));
  phoneInput = element(by.id('field_phone'));
  emailInput = element(by.id('field_email'));
  addressInput = element(by.id('field_address'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setVendorNameInput(vendorName: string): Promise<void> {
    await this.vendorNameInput.sendKeys(vendorName);
  }

  async getVendorNameInput(): Promise<string> {
    return await this.vendorNameInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
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

export class VendorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vendor-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vendor'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
