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
        Thank you for reserve at yalevanrental.com. Your Confirmation code is <strong>${requestCode}</strong><br /><br />
        Below are the details of your rental request. <br />Manage Your Request by contact us 
        at <a href="tel:+18007251322">800-725-1322</a> or email us at 
        <a href="mailto:rv@usyilu.com">rv@usyilu.com</a>
      </p>

      <h4>Request Details</h4>

      <table class="wrapper" width="640">
        <tbody>
          <tr>
            <td>
              <img src="http://www.yalevanrental.com/uploads/rental/${vehicle.vehicleTypeId}.jpg" width="250" />
            </td>
          </tr>
          <tr>
            <td>
              <table border="1" cellpadding="8" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">Vehicle Type</td>
                    <td>${vehicle.vehicleName}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">Similar Class</td>
                    <td>${vehicle.vehicleDesc}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">Milages</td>
                    <td>${vehicle.milages}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">Bags</td>
                    <td>${vehicle.bags}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray;">Seats</td>
                    <td>${vehicle.seats}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray; vertical-align: top;">
                      Pick Up
                    </td>
                    <td>
                      ${address.pick.datetime}<br />
                      ${address.pick.customAddress ? `${address.pick.address} (deliver to you)` : address.pick.address}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-right: 20px; color: gray; vertical-align: top; padding-top: 10px;">
                      Drop Off
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
            <td style="color: gray">Total Day(s)</td>
            <td>${price.totalDays}</td>
          </tr>
          <tr>
            <td style="color: gray">Daily Rate</td>
            <td>${formatMoney(price.perDay)}</td>
          </tr>
          <tr>
            <td style="color: gray">Estimated taxes & fees</td>
            <td>${formatMoney(price.totalTax)}</td>
          </tr>
          <tr>
            <td style="color: gray">Misc. Charge</td>
            <td>${formatMoney(price.misCharges)}</td>
          </tr>
          <tr>
            <td style="color: gray">Preadjustment</td>
            <td>${formatMoney(price.oneWayFee)}</td>
          </tr>
          ${
            address.pick.customAddress ? `<tr>
            <td style="color: gray">To You Deliver Service</td>
            <td>${formatMoney(price.driveForPickFee)}</td>
          </tr>` : ''
          }
          ${
            address.return.customAddress ? `<tr>
            <td style="color: gray">From You Get Car Service Charge</td>
            <td>${formatMoney(price.driveForReturnFee)}</td>
          </tr>` : ''
          }
          <tr>
            <td style="color: gray">Total</td>
            <td><strong style="font-size: 16px; color: red;">${formatMoney(price.total)}</strong></td>
          </tr>
          <tr>
            <td colspan="2" style="color: gray; font-size: 12px;">
              20% of your total will be charged for your reservation: ${formatMoney(price.prePaid)}<br />
              80% will be charged when you pick-up the car: ${formatMoney(price.restPaid)}
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
      </p>

      <p>
        <small style="color:gray;">
          Have A Question About This Reservation? <br />
          Call <a href="tel:+18007251322">800-725-1322</a> direct to Yale Car & Van Rental representatives.<br />
          Please mention your Rental Confirmation code ${requestCode}<br /><br />
          Thank you!
        </small>
      </p>
    </div>
  `; // prettier-ignore
};
