package com.ipanel.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ipanel.myapp.web.rest.TestUtil;

public class ReturnsDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReturnsData.class);
        ReturnsData returnsData1 = new ReturnsData();
        returnsData1.setId(1L);
        ReturnsData returnsData2 = new ReturnsData();
        returnsData2.setId(returnsData1.getId());
        assertThat(returnsData1).isEqualTo(returnsData2);
        returnsData2.setId(2L);
        assertThat(returnsData1).isNotEqualTo(returnsData2);
        returnsData1.setId(null);
        assertThat(returnsData1).isNotEqualTo(returnsData2);
    }
}
