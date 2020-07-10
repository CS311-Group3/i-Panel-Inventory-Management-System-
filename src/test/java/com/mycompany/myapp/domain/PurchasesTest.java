package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class PurchasesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Purchases.class);
        Purchases purchases1 = new Purchases();
        purchases1.setId(1L);
        Purchases purchases2 = new Purchases();
        purchases2.setId(purchases1.getId());
        assertThat(purchases1).isEqualTo(purchases2);
        purchases2.setId(2L);
        assertThat(purchases1).isNotEqualTo(purchases2);
        purchases1.setId(null);
        assertThat(purchases1).isNotEqualTo(purchases2);
    }
}
