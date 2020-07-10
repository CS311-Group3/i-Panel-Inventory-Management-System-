package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class SalesItemsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesItems.class);
        SalesItems salesItems1 = new SalesItems();
        salesItems1.setId(1L);
        SalesItems salesItems2 = new SalesItems();
        salesItems2.setId(salesItems1.getId());
        assertThat(salesItems1).isEqualTo(salesItems2);
        salesItems2.setId(2L);
        assertThat(salesItems1).isNotEqualTo(salesItems2);
        salesItems1.setId(null);
        assertThat(salesItems1).isNotEqualTo(salesItems2);
    }
}
