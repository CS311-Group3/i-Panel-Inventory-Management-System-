package com.ipanel.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ipanel.myapp.web.rest.TestUtil;

public class PurchaseItemsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseItems.class);
        PurchaseItems purchaseItems1 = new PurchaseItems();
        purchaseItems1.setId(1L);
        PurchaseItems purchaseItems2 = new PurchaseItems();
        purchaseItems2.setId(purchaseItems1.getId());
        assertThat(purchaseItems1).isEqualTo(purchaseItems2);
        purchaseItems2.setId(2L);
        assertThat(purchaseItems1).isNotEqualTo(purchaseItems2);
        purchaseItems1.setId(null);
        assertThat(purchaseItems1).isNotEqualTo(purchaseItems2);
    }
}
