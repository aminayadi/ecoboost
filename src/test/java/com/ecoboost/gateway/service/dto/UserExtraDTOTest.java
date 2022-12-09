package com.ecoboost.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.ecoboost.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserExtraDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtraDTO.class);
        UserExtraDTO userExtraDTO1 = new UserExtraDTO();
        userExtraDTO1.setId("id1");
        UserExtraDTO userExtraDTO2 = new UserExtraDTO();
        assertThat(userExtraDTO1).isNotEqualTo(userExtraDTO2);
        userExtraDTO2.setId(userExtraDTO1.getId());
        assertThat(userExtraDTO1).isEqualTo(userExtraDTO2);
        userExtraDTO2.setId("id2");
        assertThat(userExtraDTO1).isNotEqualTo(userExtraDTO2);
        userExtraDTO1.setId(null);
        assertThat(userExtraDTO1).isNotEqualTo(userExtraDTO2);
    }
}
