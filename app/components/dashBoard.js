import React from 'react';
// import styled from 'styled-components';
import styles from './CreateAccount.css';

const icon = require('../../resources/nep_gov.png');

export default () => (
  <div className={styles.dashBoardContaienr}>
    <div className={styles.inDiv}>
      <span className={styles.dashSpan}>
      घटना दर्ता अभिलेख
      </span>
      <img className={styles.dashImage} src={icon} alt="img" width="350px" height="300px" />
      <span className={styles.dashSpan}>
        शुक्लागण्डकी नगरपालिका
      </span>
      <span className={styles.dashSpan}>
      नगर कार्यपालिकाको कार्यालय
      </span>
      <span className={styles.dashSpan}>
      दुलेगाैंडा, तनहुँ
      </span>
      <span className={styles.dashSpan}>
      गण्डकी प्रदेश, नेपाल
      </span>
    </div>
  </div>
);
