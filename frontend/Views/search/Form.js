import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { flushResults, flushSelectedVehicle } from '../../actions';

import Navigator from './Navigator';

class Form extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="result-container">
        <Navigator passedStep={4} {...this.props} />
        <div className="form-wrap">
          <div className="container">
            <div className="main-block">
              <form>
                <div className="form-items">
                  <div className="form-item">
                    <div className="header">
                      <h3>Personal Information</h3>
                    </div>
                    <div className="body">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="firstName">
                            First Name<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="lastName">
                            Last Name<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="email">
                            Email<span>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="emailConfirm">
                            Confirm Email<span>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="emailConfirm"
                            name="emailConfirm"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="phone">
                            Phone Number<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="header">
                      <h3>Payment Information</h3>
                    </div>
                    <div className="body">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="cardHolderName">
                            Cardholder Name
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardHolderName"
                            name="cardHolderName"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="cardType">
                            Credit Card Type<span>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="cardType"
                            name="cardType"
                          >
                            <option>Choose...</option>
                            <option>VISA</option>
                            <option>MasterCard</option>
                            <option>Discover</option>
                            <option>American Express</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="cardNo">
                            Card Number<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="•••• •••• •••• ••••"
                            id="cardNo"
                            name="cardNo"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="expireMM">
                            Expire Date<span>*</span>
                          </label>
                          <div className="row gutter-10">
                            <div className="col-md-6">
                              <select
                                className="form-control"
                                id="expireMM"
                                name="expireMM"
                              >
                                <option>MM</option>
                                <option>01</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <select
                                className="form-control"
                                id="expireYY"
                                name="expireYY"
                              >
                                <option>YY</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="cvv">
                            CVV<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="•••"
                            id="cvv"
                            name="cvv"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="header">
                      <h3>Billing Address</h3>
                    </div>
                    <div className="body">
                      <div className="form-group">
                        <label htmlFor="address1">
                          Address 1<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1234 Main St"
                          id="address1"
                          name="address1"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address2">Address 2</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, studio, or floor"
                          id="address2"
                          name="address2"
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="city">
                            City<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="state">
                            State<span>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="state"
                            name="state"
                          >
                            <option>Choose...</option>
                            <option>...</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="zip">
                            Zip<span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="body">
                      <div className="tos-wrap">
                        <div>Terms and Conditions</div>
                        <div className="tos-content">
                          1.Definations.<br />
                          "Agreement" means all terms and conditions found on
                          the "Face Page", these Terms &amp; Conditions, and any
                          addenda or additional materials that we provide and
                          you sign at the time of rental. "You" or "your" means
                          the person identified as the renter in this Agreement,
                          any person signing this Agreement, each Authorized
                          Driver, and each person or organization to whom
                          charges are billed by us at its or the renter's
                          direction. All persons referred to as "you" or "your"
                          are jointly and severally bound by this Agreement.
                          "We", "our" or "us" means the rental company named
                          elsewhere in this Agreement, its agents and its
                          employees. "Authorized Driver" means the renter and
                          each additional driver listed by us in this Agreement,
                          provided that each such person has a valid driver's
                          license and is at least age 21. Only Authorized
                          Drivers are permitted to drive the Vehicle. "Vehicle"
                          means the automobile or truck identified in this
                          Agreement and each vehicle we substitute for it, and
                          all its tires tools, accessories, equipment, keys and
                          vehicle documents. The Vehicle may be equipped with
                          global positioning satellite ("GPS") technology or
                          another telematics system and/or an event data
                          recorder, and privacy is not guaranteed. "CDW" means
                          Collision Damage Waiver. "physical Damage" means
                          damage to or loss of the Vehicle used by collision or
                          upset. Physical Damage does not include comprehensive
                          damage, such as damage to or loss of the Vehicle due
                          to theft, vandalism, act of nature, riot or civil
                          disturbance, hail, flood or fire, or other
                          comprehensive loss not caused by collision or upset.
                          "Loss of Use" means the loss of our ability to use the
                          Vehicle for our purposes due to Vehicle damage or loss
                          during this rental, including use for rent, display
                          for rent and sale, opportunity to upgrade or sell, or
                          transportation of employees. "Diminished Value" means
                          the difference between the fair market value of the
                          Vehicle before damage and its value after repairs as
                          calculated by a third-party estimate obtained by us or
                          on our behalf. "Charges" means the fees and charges
                          that are incurred under this Agreement. "Rental
                          Period" means the period between the time you take
                          possession of the Vehicle until the Vehicle is either
                          returned to or recovered by us and checked in by us.
                          "Vehicle License Fee" "Vehicle licensing," Vehicle
                          License Prop Tax," "Vehicle License Cost Recovery
                          Fee," or "Motor Vehicle Tax" means a vehicle license
                          cost recovery fee based on our estimated average per
                          day per vehicle portion of our total annual vehicle
                          licensing, titling, and registration costs.<br />
                          2. Rental, Indemnity and Warranties.<br />
                          This is a contract for the rental of the Vehicle. We
                          may repossess the Vehicle at your expense without
                          notice to you, if the Vehicle is abandoned or used in
                          violation of law or this Agreement. We have the right
                          to monitor the Vehicle trough GPS or other remote
                          tracking devices and disable tit when we deem
                          necessary. you agree to indemnify us, defend us and
                          hold us harmless from all judgements, clams,
                          liability, costs and attorney fees we incur resulting
                          from, or arising out of, this rental and your use of
                          the Vehicle or our repossession of it. We make no
                          warranties, express, implied or apparent, regarding
                          the Vehicle, no warranty of merchantability and no
                          warranty that Vehicle is fit for a particular purpose.<br
                          />
                          3. Condition and Return of Vehicle.<br />
                          You must return the Vehicle to our rental office or
                          other location we specify, on the date and time
                          specified in this Agreement and in the same condition
                          that you received it except for ordinary wear. To
                          extend the Rental Period, you must return the Vehicle
                          to our rental office for inspection and written
                          amendment by us before the due - in date. If the
                          Vehicle is returned after closing hours, you remain
                          responsible for loss of and damage to the Vehicle
                          until we inspect it upon our next opening for
                          business, and Charges may continue to accrue. Service
                          to the Vehicle or replacement of parts or accessories
                          during the rental must have our prior written
                          approval. You must check and maintain all fluid
                          levels, and return the Vehicle with at least the same
                          amount of fuel as when rented, unless you purchase and
                          prepaid fuel option.<br />
                          4. Responsibility for Damage or Loss; Reporting to
                          Police.<br />
                          You are responsible for all damage to or loss or theft
                          of the Vehicle, including damage caused by weather,
                          acts of God, and terrain conditions. Your
                          responsibility will include: (a) all physical damage
                          to the Vehicle measured as follows: (i) if we
                          determine that the Vehicle is a total loss, the fair
                          market value of the Vehicle, less salvage; (ii) if we
                          determine that the Vehicle is repairable: (A) the
                          difference between the value of the Vehicle
                          immediately before the damage and the value
                          immediately after the damage; or (B) the reasonable
                          estimated retail value or actual cost of repair plus
                          Diminished Value; (b) Loss of Use, which is measured
                          by multiplying your daily rental rate by either the
                          actual or estimated number of days from the date the
                          Vehicle is damaged until it is replaced or repaired,
                          which you agree represents a reasonable estimate of
                          Loss of Use damages and not a penalty; (c) an
                          administrative fee, calculated based on the damage
                          repair estimate as follows, which you agree is
                          reasonable: $0-$250 damage=$50 fee; $251-$500
                          damage=$75 fee; $501-$750 damage=$100 fee; $751-$1500
                          damage=$150 fee; $1501-$2500 damage=$200 fee; over
                          $2501 damage=$250 fee; (d) towing, storage, and
                          impound charges and other reasonable incidental and
                          consequential damages; and (e) all costs associated
                          with our enforcement of this Agreement or collection
                          of Charges, including attorney’s fees, collection
                          fees, and costs whether or not litigation is
                          commenced. You must report all accidents or incidents
                          of theft and vandalism to us and the police as soon as
                          you discover them.<br />
                          5. Prohibit Uses;<br />
                          CDW The following uses of the Vehicle are prohibited
                          and are material breaches of this Agreement. The
                          Vehicle shall not be used: (a) by anyone who is not an
                          Authorized Driver, or by anyone whose driver’s license
                          is suspended in any jurisdiction; (b) by anyone under
                          the influence of a prescription or non-prescription
                          drug or alcohol; (c) by anyone who obtained the
                          Vehicle or extended the Rental Period by giving us
                          false, fraudulent or misleading information, or who
                          withheld information that would have caused us not to
                          rent the Vehicle; (d) in furtherance of an illegal
                          purpose or under circumstances that would constitute a
                          felony or other violation of law (other than a minor
                          traffic violation); (e) to carry persons or property
                          for hire; (f) to push or tow anything, to teach anyone
                          to drive, or to carry objects on the roof of the
                          Vehicle; (g) in any race, speed test or contest; (h)
                          to carry dangerous or hazardous items or illegal
                          materiel; (i) outside the United States, Canada, or
                          the geographic area described elsewhere in this
                          Agreement; (j) when loaded beyond its capacity, as
                          determined by the manufacturer of the Vehicle; (k) to
                          transport children without approved child safety seats
                          as required by law (in New Jersey, a child who is less
                          than 57 inches in height must be secured in a child
                          passenger restraint system or booster seat in a rear
                          seat); (l) to transport more persons than the Vehicle
                          has seat belts, or to carry persons outside the
                          passenger compartment; (m) to transport children
                          without approved child safety seats as required by law
                          (in New Jersey, a child who is under 8 and weighs less
                          than 80 lbs. must be secured in a child passenger
                          restraint system or booster seat in a rear seat); (n)
                          when the odometer has been tampered with or
                          disconnected; (o) when the Vehicle’s fluid levels are
                          low, or it is otherwise reasonable to expect you to
                          know that further operation would damage the Vehicle;
                          (p) with inadequately secured cargo; (q) after an
                          accident with the Vehicle unless you summon the police
                          to the accident scene; (r) to transport an animal
                          (other than a service animal); (s) in or through a
                          structure of an underpass, gas station, drive-through,
                          or other object where there is insufficient clearance
                          (width or height); or (t) by anyone who is sending an
                          electronic message, including text (SMS) messages or
                          emails, while operating the Vehicle. Sitting, standing
                          or lying on the roof of the Vehicle and smoking in the
                          Vehicle also are prohibited. PROHIBITED USE OF THE
                          VEHICLE VIOLATES THIS AGREEMENT. If we offer and you
                          purchase CDW, subject to the terms of this Agreement,
                          we will waive our right to hold you financially
                          responsibleforalloraportionofPhysicalDamagetotheVehicleasnotedontheFacePage.
                          CDW is not insurance, is optional, and may duplicate
                          coverage under your own insurance policy or credit
                          card. CDW does not apply to optional equipment
                          (“Optional Equipment”) we rent to you for use in the
                          Vehicle. If you use the Vehicle for a prohibited use
                          described above, your CDW will be invalidated, and we
                          will not waive our right to hold you financially
                          responsible for loss of or damage to the Vehicle. In
                          addition, CDW may be invalidated if the Vehicle is
                          stolen and you fail to return the Vehicle keys or
                          ignition devices that we gave you at the start of the
                          rental. Notwithstanding the purchase or other
                          availability of CDW or any other coverage that you may
                          have, you agree to cooperate with us or our assignees
                          in the investigation of any damage incident or claim,
                          of any size. Failure to do so may invalidate optional
                          protection that you purchase, including CDW.<br />
                          6. Optional Equipment.<br />
                          We offer certain Optional Equipment, including
                          navigational systems and child safety seats, upon
                          request and subject to availability for your use
                          during the rental at an additional charge. All
                          Optional Equipment is rented AS IS and must be
                          returned to us at the end of the rental in the same
                          condition as when rented. If you rent a child safety
                          seat, you must inspect and install the child seat into
                          the Vehicle yourself. If you rent a GPS device, you
                          should review the operational instructions before
                          leaving the rental location.<br />
                          7.Insurance; Handling Accidents/Incidents.<br />
                          You are responsible for all damage or loss you cause
                          to others. You agree to provide auto mobile liability,
                          collision and comprehensive insurance covering you,
                          us, and the Vehicle. New Jersey law requires us to
                          provide auto liability insurance (the “Policy) (N.J.
                          Stat. § 39:6A-1, et seq , that is excess to any other
                          valid and collectible insurance whether primary,
                          secondary, excess or contingent. The Policy provides
                          bodily injury and property damage liability coverage
                          with limits no higher than minimum levels prescribed
                          by the financial responsibility laws of the State
                          whose laws apply to the loss. In New Jersey, the
                          minimum amounts are regulated by the New Jersey
                          Insurance Code, N.J. Stat. § 39:6A-1, et seq. PIP,
                          medical payments, no-fault, uninsured or under-insured
                          motorist coverage will be for the minimum limits
                          required by applicable law (and you and we reject any
                          such coverage where permitted). New Jersey coverage
                          requirements are regulated by the New Jersey Insurance
                          Code(NJ’s. § 39:6A-1, et. seq.). A copy of the
                          compulsory Policy, as required by N.J.S.A. § 39:6A-1,
                          et seq., is available upon request. You must: (a)
                          report all damage to us and all accidents to us and
                          the police as soon as you discover them and complete
                          our incident report form; and (b) provide us with a
                          legible copy of any service of process, pleading, or
                          notice of any kind related to an accident or other
                          incident involving the Vehicle. Coverage under the
                          Policy is void if you give the Vehicle to an
                          unauthorized driver or otherwise materially breach
                          this Agreement; or if you fail to cooperate in a loss
                          investigation or to file a timely and accurate
                          incident report.<br />
                          8. Charges and Costs.<br />
                          You permit us to reserve against your credit/debit
                          card (“Reserve”) or take a cash deposit (“Deposit”) at
                          the time of rental are as on able amount in addition
                          to the estimated charges. We may use the Reserve or
                          Deposit to pay all Charges. We will authorize the
                          release of any excess Reserve or refund any excess
                          Deposit after the completion of your rental.
                          Yourdebit/creditcardissuer’sruleswillapplytoyouraccountbeingcredited
                          for the excess, which may not be immediately released
                          by the card issuer. You will pay us at or before
                          conclusionof this rental or on demand all Charges,
                          including: (a) time and mileage for the Rental Period,
                          or a mileage charge based on our experience if the
                          odometer is tampered with or disconnected; (b) fees
                          for additional drivers; (c) optional products and
                          services you purchased; (d) fuel and a refueling fee,
                          if you return the Vehicle with less fuel than when
                          rented (unless you purchase a prepaid fuel option);
                          (e) taxes and surcharges; (f) all expenses we incur in
                          locating and recovering the Vehicle if you fail to
                          return it or if we repossess it; (g) all costs,
                          including pre- and post-judgment attorney fees, we
                          incur collecting payment from you or otherwise
                          enforcing our rights under this Agreement; (h) a
                          per-month late payment fee not greater than the amount
                          permitted under the laws of the State of New Jersey;
                          (i) $50 if you pay us with a check returned unpaid;
                          (j) a reasonable fee not to exceed $350 to clean the
                          Vehicle if returned substantially less clean than when
                          rented; (k) a reasonable fee of up to $500 if you lose
                          the keys or toll transponder to the Vehicle; (l) a
                          surcharge if you return the Vehicle to a location
                          other than the location where you rented the Vehicle
                          or if you do not return it on the date and time due,
                          and you may be charged the standard rates for each day
                          (or partial day), which may be substantially higher
                          than the rates for the initially agreed rental period
                          if a special or promotional rate applied to the
                          initially agreed rental period; and (m) replacement
                          cost of lost or damaged parts and supplies used in
                          Optional Equipment. All Charges are subject to our
                          final audit. If errors are discovered after the close
                          of this transaction, you authorize us to correct the
                          Charges with your payment card issuer.<br />
                          9. Your Property <br />
                          You release us,our agents and employees from all
                          claims for loss of,or damage to,your personal property
                          or that of any other person, that we received, handled
                          or stored, or that was left or carried in or on the
                          Vehicle or in any service vehicle or in our offices,
                          whether or not the loss or damage was caused by our
                          negligence or was otherwise our responsibility.<br />
                          10. Responsibility for Tolls, Traffic Violations, and
                          Other Charges<br />
                          You are responsible for paying the charging
                          authorities directly all tolls (“Tolls”) and parking
                          citations, photo enforcement fees, fines for toll
                          evasion, and other fines, fees, and penalties(each
                          a“Violation”)assessed against you, us or the Vehicle
                          during this rental. If we are notified by charging
                          authorities that we may be responsible for payment of
                          a Toll or Violation, you will pay us, or a processing
                          firm (“Processor”)of our choosing, an administrative
                          fee of up to $50 for each such notification. You
                          authorize us to release your rental and payment card
                          information to a Processor for processing and billing
                          purposes. If we or the Process or pay a Toll or
                          Violation, you authorize us or the Processor to charge
                          all such payments, service fees and administrative
                          fees to the payment card you used in connection with
                          this rental.<br />
                          11. Personal Information<br />
                          You agree that we may disclose personally identifiable
                          information about you to law enforcement agencies and
                          to other third parties in connection with our
                          enforcement of our rights under this Agreement and
                          other legitimate business functions. Questions
                          regarding privacy should be directed to the location
                          where you rented the Vehicle.<br />
                          12. Miscellaneous<br />
                          No term of this Agreement can be waived or modified
                          except by a writing that we have signed. This
                          Agreement constitutes the entire agreement between you
                          and us. All prior representations and agreements
                          between you and us regarding this rental are void. A
                          waiver by us of any breach of this Agreement is not a
                          waiver of any additional breach or waive r of the
                          performance of your obligations under this Agreement.
                          Our acceptance of payment from you or our failure,
                          refusal or neglect to exercise any of our rights under
                          this Agreement does not constitute a waiver of any
                          other provision of this Agreement. You waive all
                          recourse against us for any criminal reports or
                          prosecutions that we take against you that arise out
                          of your breach of this Agreement. You release us from
                          all liability for consequential, special or punitive
                          damages in connection with this rental or the
                          reservation of a vehicle. This Agreement will be
                          governed by the substantive law of the State of New
                          Jersey, without giving effect to the choice of law
                          rules thereof, and you irrevocably and unconditionally
                          consent and submit to the nonexclusive jurisdiction of
                          the courts located in New Jersey. YOU AND WE EACH
                          IRREVOCABLY WAIVE ALL RIGHT TO TRIAL BY JURY IN A
                          LEGAL PROCEEDING ARISING OUT OF OR RELATING TO THIS
                          AGREEMENT OR THE TRANSACTIONS CONTEMPLATED UNDER THIS
                          AGREEMENT.<br />
                          13. Van Spare Tire Spare Tires: Every van has a spare
                          tire.<br />
                          We do not allow you to self-change the tire. You must
                          call our tow service and have a tow truck driver come
                          and change the tire. Please let our office know
                          anytime you get a flat so we can arrange to have the
                          spare replaced for you. Ford vans: It is located
                          underneath the van towards the rear of the vehicle.
                          There is a compartment in the rear wall of the van on
                          the right-hand side that contains a jack and a screw
                          lever to lower the wheel. The hole to insert the screw
                          lever is located just above the rear bumper near the
                          intersection of the two rear doors. There is usually a
                          plastic flap covering the hole that will need to be
                          opened to access the wheel lowering mechanism.
                          Mercedes vans: It is also located underneath the van
                          towards the rear of the vehicle. The tools for the
                          spare tire are underneath the floorboard in front of
                          the passenger seat. Please note the spare tire for
                          Sprinters often uses a different size of wheel bolt.
                          These bolts, if required, are also found in the spare
                          tire tool compartment. Make sure the tow truck driver
                          is aware that the spare might require these specially
                          sized wheel bolts, or they could wind up stripping the
                          wheel hub, and that will cause you a long delay
                          because the entire wheel hub will need to be
                          re-threaded!<br />
                          14. Breakdown Policy<br />
                          Our customers travel tens of millions of miles every
                          year, and despite the extraordinary effort we put into
                          vehicle maintenance, there are occasionally moments
                          where maintenance or repairs will be necessary. Should
                          a mechanical repair be necessary during the course of
                          your rental, please be assured that we will pay or
                          reimburse for all mechanical repairs, provided that
                          the repair is not due to misuse of the vehicle, or
                          collision with a foreign object. But you must call us
                          and let us know what is going on so we can help you
                          take care of it promptly. Repairs over $75 require our
                          approval before they can be initiated (this is as much
                          for your protection as ours: we've encountered some
                          shady mechanics out there.). You must follow our
                          instructions regarding maintenance and repairs,
                          regardless of the effect it may have on your schedule.
                          Sorry, but safety comes first. Failure to follow our
                          instructions voids our agreement, and any CDW we have
                          provided you with, and may result in us reclaiming our
                          vehicle at your cost. If we feel something is unsafe,
                          we have the final word. Yes we care a tremendous
                          amount about your schedule, probably more than any
                          other vehicle rental company in the world, but we
                          cannot knowingly allow anyone to compromise their
                          safety (or anyone else's). Your life and your health
                          are the most important things in our vehicles. After
                          hours: If your mechanical issue occurs after hours and
                          we are closed, we have a 24 hour nationwide tow
                          service that will tow the vehicle to the nearest
                          mechanic (see the section above about Tow Service). In
                          most places mechanics are all closed after 5pm
                          anyways, so there isn't much anybody can do until the
                          morning. Leave a message on our voicemail and we will
                          help you first thing in the morning. Go to a hotel and
                          get some sleep. Watch TV. Relax. Being stressed out
                          isn't going to help. Wake up fresh in the morning and
                          we will help you get moving as soon as possible. In
                          the event of a serious mechanical malfunction*: We
                          will make every effort to get you back on the road as
                          soon as possible. Should repairs require the vehicle
                          stay at the repair shop overnight we will issue
                          vouchers for up to two (2) hotel rooms at a convenient
                          nearby hotel (note this must be cleared with us prior
                          to booking the hotel room). In the event that repairs
                          cannot be completed within two business days we will
                          do one of two things: We will rush a Yale Car &amp;
                          Van Rental replacement vehicle out to you. If no Yale
                          Car &amp; Van Rental replacement vehicle is available
                          we will do everything we can to help you find another
                          vehicle from the closest suitable vehicle rental
                          company. You will no longer be charged by Yale Car
                          &amp; Van Rental starting on the day of the mechanical
                          failure, we will close our rental agreement, and you
                          will be able to leave the Yale Car &amp; Van Rental
                          van at the repair shop and continue with your tour
                          with the new vehicle rental company. You will be
                          responsible for paying for the new rental vehicle
                          and/or any other expenses you may incur once our
                          rental agreement has been closed. We will cover all of
                          the costs of recovering our vehicle and transporting
                          it back to one of our locations. Please note that we
                          cannot guarantee other vehicle rental companies will
                          be able to match our rates, vehicle configuration,
                          amenities or services.<br />
                          15. Remote &amp; Rural areas, International Travel We
                          do not own teleportation devices.<br />
                          If you take the vehicle into the middle of the desert,
                          deep into massive national parks, on camping trips to
                          the boonies, or otherwise drive to locations far from
                          mechanics and part supplies this will have a
                          corresponding impact on our ability to get you moving
                          quickly again if there is a problem. You assume this
                          risk when traveling in remote, rural and/or isolated
                          areas. We will still do everything we can to help you,
                          but it can take longer to get repairs or parts, and we
                          are not liable for expenses you may incur as a result
                          of your travel to remote areas (this includes expenses
                          such as gas, miles, lodging, etc not otherwise
                          provided for in our standard agreement). We are not
                          bad people because of it, there's just limits to what
                          we can provide and still offer vehicles at a
                          reasonable price. Please have realistic expectations.<br
                          />
                          16 .Rental Requirements Rental Requirements:<br />
                          Anybody who plans on driving our vehicle must meet the
                          following requirements: Valid driver's license (or
                          International Driver License along with your
                          Passport). Proof of auto liability insurance* (Either
                          your own policy, or purchased through us). Some form
                          of collision coverage (either through your own
                          insurance policy, through credit card coverage, or by
                          purchasing our Collision Damage Waiver). Your credit
                          card. If the cardholder will not be present at pickup
                          we need a signed credit card authorization agreement
                          and a copy of the cardholder's driver's license. For
                          Rental Vans are more than 9 seats, You must be over 25
                          years of age with three years of driving experience to
                          drive our vehicle unless you have our prior written
                          authorization. Other vehicles less than 9 seats, you
                          must be over 21 years of age with one year of driving
                          experience to drive our vehicle. And an underage fee
                          will be added in your reservation if the driver is
                          less than 25 years old. You must be fit to drive. We
                          will not give you the keys if, in our judgement, you
                          are inebriated, incapacitated, or otherwise incapable
                          of driving our vehicle safely. *Please note: We are
                          happy to scan copies of these documents upon your
                          arrival, but if you want to save a little time please
                          bring a copy with you. You may email them to us. Our
                          email is rv@usyilu.com. Please make sure you include
                          your reservation number, the name of the group and the
                          dates of the rental when sending us documents, as we
                          receive a lot of documents, and won't know which
                          rental it is for without this information.
                        </div>
                      </div>

                      <div className="tos-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="tosAgree"
                            defaultChecked
                          />
                          I have read and accept the Terms & Conditions above.
                        </label>
                      </div>

                      <div className="tos-agree">
                        By clicking on the “Submit”button,you confirm that you
                        understand and accept our{' '}
                        <span className="highlight">
                          Rental Qualification and Requirements,Terms and
                          Conditions and you understand the Age Restrictions.
                        </span>
                      </div>

                      <div className="submit-wrap">
                        <button
                          type="button"
                          className="btn btn-danger rounded-0"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="side-block">
              <div className="price-total">
                <ul className="list-unstyled">
                  <li className="total-line">
                    <strong>Total</strong>
                    <span>$174.55</span>
                  </li>
                  <li>
                    20% of your total will be charged for your reservation<span>
                      $34.91
                    </span>
                  </li>
                  <li>
                    80% will be charged when you pick-up the car<span>
                      $139.64
                    </span>
                  </li>
                </ul>
                <p className="desc">
                  'Total' does not include any additional items you may select
                  at the location or any costs arising from the rental (such as
                  damage, fuel or road traffic charges). For renters under the
                  age of 25, additional charges may apply, and are payable at
                  the location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.rentalReducer
  };
}

export default connect(mapStateToProps, { flushResults, flushSelectedVehicle })(
  Form
);
