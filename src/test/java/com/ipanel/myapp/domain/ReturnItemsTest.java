package com.ipanel.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ipanel.myapp.web.rest.TestUtil;

public class ReturnItemsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnItems.class);
        ReturnItems returnItems1 = new ReturnItems();
        returnItems1.setId(1L);
        ReturnItems returnItems2 = new ReturnItems();
        returnItems2.setId(returnItems1.getId());
        assertThat(returnItems1).isEqualTo(returnItems2);
        returnItems2.setId(2L);
        assertThat(returnItems1).isNotEqualTo(returnItems2);
        returnItems1.setId(null);
        assertThat(returnItems1).isNotEqualTo(returnItems2);
    }
}
