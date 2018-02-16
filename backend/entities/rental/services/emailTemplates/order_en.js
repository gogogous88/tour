const _ = require("lodash");
const keys = require("../../../../../config/credentials");

function formatMoney(amount, locale = "en-US", currency = "USD") {
  return _.toNumber(amount).toLocaleString(locale, {
    style: "currency",
    currency
  });
}

module.exports = ({ requestCode, vehicle, price, address, paymentForm }) => {
  return `
    <style type="text/css">
      .ReadMsgBody{ width: 100%;} /* Forces Hotmail to display emails at full width */
      .ExternalClass { width: 100%;} /*Hotmail table centering fix*/
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}, .ExternalClass * {line-height: 100%;}  /* Forces Hotmail to display normal line spacing*/
      p { margin: 1em 0;} /*Yahoo paragraph fix*/
      table td { border-collapse: collapse;}  /*This resolves the Outlook 07, 10, and Gmail td padding issue fix*/

      @media only screen and (max-device-width: 480px) {
        table[class=wrapper]{
          width: 100% !important;
        }
      }
    </style>

    <div style="font-size: 14px; line-height: 20px;">
      <p>
        Dear ${paymentForm.firstName} ${paymentForm.lastName}, <br /><br />
        Thank you for reserve at yalevanrental.com. Your Reservation code is <strong>${requestCode}</strong><span style="color: red">we will call/email you about your confirmation info.</span><br /><br />
        Below are the details of your rental request. <br />Manage Your Request by contact us 
        at <a href="tel:+18007251322">800-725-1322</a> or email us at 
        <a href="mailto:rv@usyilu.com">rv@usyilu.com</a>
      </p>

      <p>
        尊敬的 ${paymentForm.firstName} ${paymentForm.lastName}, <br /><br />
        谢谢您在途盖大导通的预定，您的预订号是：<strong>${requestCode}</strong><span style="color: red">请保持手机畅通并且email通常，确认信将在24个工作小时提供给您。</span><br /><br />
        您的租车预定信息如下:</br>您可以通过致电<a href="tel:+18007251322">800-725-1322</a>或通过email:<a href="mailto:rv@usyilu.com">rv@usyilu.com</a>与我们进行联系。
       
      </p>

      <h4>Request Details</h4>

      <table class="wrapper" width="640">
        <tbody>
          <tr>
            <td>
              <img src="src/static/images/${vehicle.vehicleTypeId}.jpg" width="250" />
            </td>
          </tr>
          <tr>
            <td>
              <table border="1" cellpadding="8" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">车种</td>
                    <td>${vehicle.vehicleName}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">车型</td>
                    <td>${vehicle.vehicleDesc}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">英里数</td>
                    <td>${vehicle.milages}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">行粒数</td>
                    <td>${vehicle.bags}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">座位数</td>
                    <td>${vehicle.seats}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray; vertical-align: top;">
                      取车
                    </td>
                    <td>
                      ${address.pick.datetime}<br />
                      ${address.pick.customAddress ? `${address.pick.address} (deliver to you)` : address.pick.address}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray; vertical-align: top; padding-top: 10px;">
                      还车
                    </td>
                    <td style="padding-top: 10px;">
                      ${address.return.datetime}<br />
                      ${address.return.customAddress ? `${address.return.address} (get from you)` : address.return.address}
                    </td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Price Details</h4>

      <table border="1" cellpadding="8" cellspacing="0" class="wrapper" width="640">
        <tbody>
          <tr>
            <td style="color: gray">天数</td>
            <td>${price.totalDays}</td>
          </tr>
          <tr>
            <td style="color: gray">价格/天</td>
            <td>${formatMoney(price.perDay)}</td>
          </tr>
          <tr>
            <td style="color: gray">税费</td>
            <td>${formatMoney(price.totalTax)}</td>
          </tr>
          <tr>
            <td style="color: gray">额外费用</td>
            <td>${formatMoney(price.misCharges)}</td>
          </tr>
          <tr>
            <td style="color: gray">异地还车费</td>
            <td>${formatMoney(price.oneWayFee)}</td>
          </tr>
          ${
            address.pick.customAddress ? `<tr>
            <td style="color: gray">指定地点送车费</td>
            <td>${formatMoney(price.driveForPickFee)}</td>
          </tr>` : ''
          }
          ${
            address.return.customAddress ? `<tr>
            <td style="color: gray">取车费</td>
            <td>${formatMoney(price.driveForReturnFee)}</td>
          </tr>` : ''
          }
          <tr>
            <td style="color: gray">小计</td>
            <td><strong style="font-size: 16px; color: red;">${formatMoney(price.total)}</strong></td>
          </tr>
          <tr>
            <td colspan="2" style="color: gray; font-size: 12px;">
              如果预定成功，我们将从您预留的信用卡征收：
              20% of your total will be charged for your reservation: ${formatMoney(price.prePaid)}<br />
              如果预定成功，我们将首先征收: ${formatMoney(price.prePaid)}<br />
              80% will be charged when you pick-up the car: ${formatMoney(price.restPaid)}<br />
              80%的余款将在您取车钱72小时征收。
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <small style="color:gray;">
          Prices are in USD (unless stated otherwise).<br />
          A 20% will be charged by Yale Car & Van Rental to make your reservation confirmed.<br />
          Please click <a href="/rental/policy">Terms & Conditions</a> for Cancellation Policy
        </small>
        <small style="color:gray;">
          征收价格为美金单位。<br />
          一旦我们确认，我们将从您的信用卡征收20%的款目用于预定金。<br />
          请阅读<a href="/rental/policy">租车条款</a> 有关我们的改退协议。
        </small>
      </p>

      <p>
        <small style="color:gray;">
          Have A Question About This Reservation? <br />
          Call <a href="tel:+18007251322">800-725-1322</a> direct to Yale Car & Van Rental representatives.<br />
          Please mention your Rental reservation code ${requestCode}<br /><br />
          Thank you!
        </small><br />
        <small style="color:gray;">
          如果您有任何问题： <br />
          请拨打 <a href="tel:+18007251322">800-725-1322</a> 此订单的第三方处理公司：一路租车.<br />
          请告知服务人员您的预定号： ${requestCode}<br /><br />
          谢谢合作！
        </small>
      </p>
    </div>
  `; // prettier-ignore
};
