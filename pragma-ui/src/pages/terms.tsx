import React from "react";
import BoxContainer from "../components/common/BoxContainer";
import styles from "./styles.module.scss";
import GreenUpperText from "../components/common/GreenUpperText";
import GreenText from "../components/common/GreenText";
import classNames from "classnames";
import Link from "next/link";

const terms = () => {
  return (
    <BoxContainer className={classNames(styles.bigScreen, "2xl:pl-20")}>
      <div className="flex flex-col gap-7 ">
        <h2 className="w-full pt-32 text-left text-lightGreen ">
          Pragma terms and conditions
        </h2>
        <GreenUpperText>Version 1.0</GreenUpperText>
        <GreenText>Effective 15/02/2024</GreenText>
        <div className="font-mono tracking-wider text-lightGreen">
          These terms of service, together with any documents and additional
          terms they incorporate by reference (collectively, these “Terms”), are
          entered into between ZkPad SA (the “Foundation,” “we,” “us,” and
          “our”) and you or the company or other legal entity that you represent
          (“you” or “your”). Please read these Terms carefully as they govern
          your use of our site located at{" "}
          <Link
            className="text-mint underline"
            href={"https://pragma.build/pragma.build"}
          >
            pragma.build
          </Link>{" "}
          and all associated sites (the “Website”) and our Services (defined
          below) and describe your rights and obligations and our disclaimers
          and limitations of legal liability. By accessing or using any part of
          the Website or the Services, you agree to become bound by the terms
          and conditions of these Terms. If you use the Services on behalf of a
          company, organization (including a decentralized autonomous
          organization or “DAO”) or other entity then “you” includes you and
          that entity, and you represent and warrant that (a) you are an
          authorized representative of the entity with the authority to bind the
          entity to these Terms, and (b) you agree to these Terms on the
          entity&apos;s behalf. If you do not agree to these Terms or do not
          have authority to bind your organization on whose behalf you are using
          the Services to these Terms, you must not access or use our Website or
          the Services. Please carefully review the disclosures and disclaimers
          set forth in Section 8 in their entirety before accessing the Website,
          our Services, or using any software developed by the Foundation.
          Please refer to our privacy policy available at{" "}
          <Link
            className="text-mint underline"
            href={"https://pragma.build/privacyPolicy"}
          >
            pragma.build/privacyPolicy
          </Link>{" "}
          for information about how we collect, use, share and otherwise process
          information about you. In addition, you agree to comply with the
          Pragma Community Code of Conduct with respect to any interactions on
          or arranged through the Website. We reserve the right, in our sole
          discretion, to modify these Terms from time to time. If we make
          changes, we will provide you with notice of such changes using
          commercially reasonable means, such as by sending an email, providing
          a notice through the Website or our Services or updating the date at
          the top of these Terms. Unless we say otherwise in our notice, any
          modifications are effective immediately, and your continued use of the
          Website or our Services will confirm your acceptance of the changes.
          If you do not agree to the amended Terms, you must stop using our
          Services. <br /> <br />
          <h5 className="text-mint">1. SERVICES</h5> <br /> The Website enables
          users to access open source documentation, content, and services,
          including (without limitation) resources, data and computation
          services provided by decentralized networks of node operators that are
          selling usage of specific data via data feeds, APIs and various
          payment capabilities directly to smart contracts integrating Pragma
          software (Pragma Network”), and information and resources for the
          Pragma Network community (collectively such services, information,
          APIs, and resources related to the Pragma Network are referred to as
          the “Services”). Some Services offered by us or other participants in
          the Pragma Network require payment or otherwise involve the use of an
          underlying blockchain or other decentralized or permissioned
          infrastructure (“Distributed Ledger Technology”), which may require
          that you pay a fee, such as “gas” charges on the Ethereum network or
          other applicable blockchain network, for the computational resources
          required to perform a transaction on the particular Distributed Ledger
          Technology (such payments and fees, “Charges”). You acknowledge and
          agree that the Foundation has no control over any Distributed Ledger
          Technology transactions, the method of payment of any Charges, if
          applicable, or any actual payments of Charges, if applicable.
          Accordingly, you must ensure that you have a sufficient balance of the
          applicable Distributed Ledger Technology network tokens stored at your
          Distributed Ledger Technology-compatible wallet address (“Distributed
          Ledger Technology Address”) to complete any transaction on the Pragma
          Network or the Distributed Ledger Technology before initiating such a
          transaction.
          <br /> <br />
          <h5 className="text-mint">
            2. YOUR REPRESENTATIONS AND WARRANTIES; CONDITIONS
          </h5>{" "}
          <br /> To use the Website or Service, you must be able to form a
          legally binding contract online either on behalf of the entity on
          whose behalf that you are using the Website or Services, or as an
          individual if you are using the Website or the Services in your
          personal capacity. Accordingly, you represent that you are at least 18
          years old (or the age of majority where you reside, whichever is
          older), can form a legally binding contract online, and have the full,
          right, power and authority to enter into and to comply with the
          obligations under these Terms. Additionally, you represent and warrant
          that you are not a citizen or resident of a state, country, territory
          or other jurisdiction that is sanctioned or embargoed by the Cayman
          Islands, British Virgin Islands, Switzerland, the European Union or
          the United States (or if you are using the Website or Services on
          behalf of an entity, that such entity is not domiciled in any such
          territory) or where your use of the Website or the Services would be
          illegal or otherwise violate any domestic or foreign law, rule,
          statute, regulation, by-law, order, protocol, code, decree, or other
          directive, requirement or guideline, published or in force which
          applies to or is otherwise intended to govern or regulate any person,
          property, transaction, activity, event or other matter, including any
          rule, order, judgment, directive or other requirement or guideline
          issued by any domestic or foreign federal, provincial or state,
          municipal, local or other governmental, regulatory, judicial or
          administrative authority having jurisdiction over the Foundation, you,
          the Website or the Services, or as otherwise duly enacted, enforceable
          by law, the common law or equity (“Applicable Law”). As a condition to
          accessing or using the Services or the Website, you represent, warrant
          and agree that you: (i) will only use the Website and the Services for
          lawful purposes and in accordance with these Terms; (ii) will ensure
          that all information that you provide on the Website or for the
          Services is current, complete, and accurate; (iii) will maintain the
          security and confidentiality of access to your Distributed Ledger
          Technology Address; (iv) will identify and assess the accuracy,
          availability and quality of data that you choose to consume via the
          Pragma Network or the code you choose to run via the Pragma Network;
          and (v) agree (A) that no Protected Party (defined below) will be
          responsible for any loss or damage incurred as the result of any
          interactions you have with other users of the Website, Services or the
          Pragma Network, including the loss of any amount of the native utility
          future token of the Pragma Network (“Pragma Tokens”), any other tokens
          or other unit of value; and (B) if there is a dispute between you and
          any other site or other user, no Protected Party will be under any
          obligation to become involved. As a condition to accessing or using
          the Website or the Services, you represent, warrant and agree that you
          will not: (i) violate any Applicable Law, including, without
          limitation, any relevant and applicable anti-money laundering and
          anti-terrorist financing laws and any relevant and applicable privacy
          and data collection laws, in each case as may be amended from time to
          time; (ii) export, reexport, or transfer, directly or indirectly, any
          Foundation technology or Pragma Network data in violation of
          applicable export laws or regulations; (iii) infringe on or
          misappropriate any third-party intellectual property rights or other
          third-party rights, including any unauthorized use of data, breaches
          of Pragma Network third-party service provider terms, or committing a
          tort while using the Website or the Services; (iv) misrepresent the
          truthfulness, sourcing or reliability of any content on the Website or
          through the Services; (v) use the Website or Services in any manner
          that could interfere with, disrupt, negatively affect, or inhibit
          other users from fully enjoying the Website, Services or the Pragma
          Network, or that could damage, disable, overburden, or impair the
          functioning of the Website, Services or the Pragma Network in any
          manner; (vi) attempt to circumvent any content filtering techniques or
          security measures that the Foundation employs on the Website or the
          Services, or attempt to access any service or area of the Website or
          the Services that you are not authorized to access; (vii) use any
          robot, spider, crawler, scraper, or other automated means or interface
          not provided by us, to access the Website or Services or to extract
          data; (viii) introduce any malware, virus, Trojan horse, worm, logic
          bomb, drop-dead device, backdoor, shutdown mechanism or other harmful
          material into the Website or the Services; (ix) post content or
          communications on the Website or through the Services (including User
          Content (as defined below)) that are, in our sole discretion,
          libelous, defamatory, profane, obscene, pornographic, sexually
          explicit, indecent, lewd, vulgar, suggestive, harassing, hateful,
          threatening, offensive, discriminatory, bigoted, abusive,
          inflammatory, fraudulent, deceptive or otherwise objectionable or in
          violation of the Pragma Community Code of Conduct; (x) post content on
          the Website or through the Services containing unsolicited promotions,
          political campaigning, or commercial messages or any chain messages or
          user content designed to deceive or trick the user of the Service; or
          (xi) encourage, induce or assist any third party to engage in any of
          the activities prohibited under these Terms. You represent and warrant
          that you: (i) have the necessary technical expertise and ability to
          review and evaluate the security, integrity and operation of any of
          Pragma future Tokens that you decide to acquire, sell or use; (ii)
          have the knowledge, experience, understanding, professional advice and
          information to make your own evaluation of the merits, risks and
          applicable compliance requirements under Applicable Law of any Pragma
          future Token; and (iii) know, understand and accept the risks
          associated with your use of the Pragma Network, your Distributed
          Ledger Technology Address, the Distributed Ledger Technology, Pragma
          future Tokens and other network tokens, including the risk of mining
          attacks such as “double-spend attacks,” “majority mining power
          attacks,” “selfish-mining attacks,” “race condition attacks” and the
          risks identified in Section 14 below. The Pragma Network enables
          access to data from multiple sources and you acknowledge and agree
          that the accuracy, availability or quality of data provided via the
          Pragma Network may be impacted by various factors, including as a
          result of the underlying data being of low quality, volatile, or
          otherwise compromised at the data source.
          <br /> <br />
          <h5 className="text-mint">3. PROPRIETARY RIGHTS</h5> <br />
          Excluding any open source software or third-party software that the
          Website or the Services incorporates, as between you and Foundation,
          the Foundation owns the Website and the Services, including all
          technology, content and other materials used, displayed or provided on
          the Website (including all intellectual property rights), and hereby
          grants you a limited, revocable, non-transferable, license to access
          and use those portions of the Website and the Services that are
          proprietary to the Foundation in accordance with their intended uses
          and using their designated public interfaces. Certain of the Services
          are governed by the most recent version of the open source license,
          commonly known as the MIT License, and any other applicable licensing
          terms for the Website and the Services in these Terms (collectively,
          the “Foundation License”). You acknowledge that the Website, the
          Services or the Pragma Network may use, incorporate or link to certain
          open-source components and that your use of the Website, Services
          and/or the Pragma Network is subject to, and you will comply with any,
          applicable open-source licenses that govern any such open-source
          components (collectively, “Open-Source Licenses”). Without limiting
          the generality of the foregoing, you may not resell, lease, lend,
          share, distribute or otherwise permit any third party to use the
          Website or the Services or otherwise use the Website or the Services
          in a manner that violates the Foundation License or any other
          Open-Source Licenses. Any of the Foundation&apos;s product or service
          names, logos, and other marks used in the Website or as a part of the
          Services, including the Foundation&apos;s name and logo are trademarks
          owned by the Foundation or its applicable licensors. You may generally
          use the Foundation&apos;s name and logo to refer to the
          Foundation&apos;s mission and activities provided that it does not in
          any way suggest or imply partnership or collaboration with,
          sponsorship or approval by the Foundation. You may also indicate the
          relationship of your products and services to the Foundation&apos;s
          mission and activities by using an accurate descriptive term in
          connection with your product or service. You may not use the
          Foundation&apos;s name and logo in a manner that may cause confusion
          with others or result in genericization. The Foundation reserves its
          right to prohibit the use of the Foundation&apos;s marks by anyone at
          our sole discretion. Except as provided in the foregoing, you may not
          copy, imitate or use the Foundation&apos;s marks without the
          Foundation&apos;s (or the applicable licensor&apos;s) prior written
          consent. The Foundation will be free to use, disclose, reproduce,
          license, and otherwise distribute and exploit any suggestions,
          comments, or other feedback provided by you to the Foundation with
          respect to the Website or Services (“Feedback”) provided to it as it
          sees fit, entirely without obligation or restriction of any kind, on
          account of intellectual property rights or otherwise. The Website and
          the Services provide access to certain third-party websites (“External
          Sites”) that provide third-party services, including services provided
          by ZkPad SA, or one of its subsidiaries or affiliates (“Third Party
          Services”) solely as a convenience to you and not based on any
          affiliation with the External Sites. The content of such External
          Sites is developed and provided by others. You should contact the site
          administrator and reference the terms of use associated with such
          External Sites if you have any questions or concerns regarding such
          Third Party Services. We make no warranties or representations,
          express or implied, about such Third-Party Services. You acknowledge
          sole responsibility for and assume all risk arising from your use of
          any Third-Party Services. <br /> <br />
          <h5 className="text-mint">
            4. USER CODE AND USER CONTENT
          </h5> <br /> The Website and the Services permit users to run certain
          code via the Pragma Network (“User Code”), distribute or publish
          certain data on-chain, streaming live and pre-recorded audio-visual
          works, to use services, such as chat, bulletin boards, forum or blog
          postings, wiki contributions and to participate in other activities in
          which you may create, post, transmit, perform, or store content,
          videos or other materials through the Website or the Services
          (collectively, “User Content”). All User Content must comport with
          these Terms and the Pragma Community Code of Conduct. If you submit
          User Code in connection with any Services, you hereby grant the
          Foundation, its affiliates and any third party Service Providers to
          the Pragma Network a worldwide, irrevocable, perpetual, non-exclusive,
          fully paid up and royalty-free right to use, reproduce or store such
          User Code solely for the purposes of (i) providing or performing the
          Services; (ii) distributing or promoting the Pragma Network and
          Services; and (iii) developing and improving the Pragma Network and
          the Services. If you submit, transmit, display, perform, post or store
          User Content using the Website, you grant the Foundation and its
          sublicensees, to the fullest extent and for the maximum duration
          permitted by Applicable Law (including in perpetuity if permitted
          under Applicable Law), an unrestricted, worldwide, irrevocable, fully
          sublicensable, non-exclusive, and royalty-free right to (a) use,
          reproduce, modify, adapt, publish, translate, create derivative works
          from, distribute, perform and display such User Content in any form,
          format, media or media channels now known or later developed or
          discovered; and (b) use the name, identity, likeness and voice (or
          other biographical information) that you submit in connection with
          such User Content. Should such User Content contain the name,
          identity, likeness and voice (or other biographical information) of
          third parties, you represent and warrant that you have obtained the
          appropriate consents and/or licenses for your use of such features and
          that the Foundation and its sublicensees are allowed to use them to
          the extent indicated in these Terms. To the furthest extent permitted
          by Applicable Law, you hereby agree that the Foundation shall not be
          liable for any unauthorized copying, use or distribution of User
          Content by third parties and release and forever waive any claims you
          may have against the Foundation for any such unauthorized copying or
          usage of the User Content, under any theory. You are solely
          responsible for your User Code and User Content and the consequences
          of posting or publishing it on the Website or through the use of the
          Services. You represent and warrant that: (1) you are the creator and
          owner of the User Code or User Content or otherwise have sufficient
          rights and authority to grant the rights granted herein; (2) your User
          Code or User Content does not and will not (a) infringe, violate, or
          misappropriate any third-party right, including any copyright,
          trademark, patent, trade secret, moral right, privacy right, right of
          publicity, or any other intellectual property or proprietary right or
          (b) defame any other person; and (3) your User Code or User Content
          does not contain any viruses, adware, spyware, worms, or other harmful
          or malicious code. The Foundation reserves all rights and remedies
          against any users who breach these representations and warranties.
          Further, you agree that your User Content will comply with the
          guidelines issued by the U.S. Federal Trade Commission from time to
          time, as well as any other advertising guidelines required under
          applicable law. You are solely responsible for any endorsements or
          testimonials you make regarding any product or service through the
          Website. <br /> <br />
          <h5 className="text-mint">
            5. CHANGES; SUSPENSION; TERMINATION
          </h5>{" "}
          <br /> The Pragma Network is intended to be decentralized and
          self-operating, with or without any Services provided by the
          Foundation. Accordingly, we may, at our sole discretion, from time to
          time and with or without prior notice to you, modify, suspend or
          disable, temporarily or permanently, the Services offered by the
          Foundation, in whole or in part, for any reason whatsoever, including,
          but not limited to, as a result of a security incident, your violation
          of these Terms or, in the Foundation&apos;s good faith judgment, such
          changes, suspension or termination are necessary for the protection of
          the Pragma Network. We will not be liable for any losses suffered by
          you resulting from any modification to any Services or from any
          suspension or termination, for any reason, of your access to all or
          any portion of the Website or the Services. All of these terms will
          survive any termination of your access to the Website or the Services,
          regardless of the reasons for its expiration or termination, in
          addition to any other provision which by law or by its nature should
          survive.
          <br /> <br />
          <h5 className="text-mint">6. ELECTRONIC NOTICES</h5> <br /> You
          consent to receive all communications, agreements, documents,
          receipts, notices, and disclosures electronically (collectively, our
          “Communications”) that we provide in connection with these Terms or
          any Services. You agree that we may provide our Communications to you
          by posting them on the Website or through the Services or by emailing
          them to you at the email address you provide in connection with using
          the Services. You should maintain copies of our Communications by
          printing a paper copy or saving an electronic copy. You may also
          contact our support team to request additional electronic copies of
          our Communications by filing a support request at{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>{" "}
          .
          <br /> <br />
          <h5 className="text-mint">7. INDEMNIFICATION</h5> <br />
          You will defend, indemnify, and hold harmless the Foundation, our
          members, directors, officers, employees, attorneys, agents,
          representatives, suppliers, licensors and contractors (collectively,
          Protected Parties”) from any claim, demand, lawsuit, action,
          proceeding, investigation, liability, damage, loss, cost or expense,
          including without limitation reasonable attorneys&apos; fees, arising
          out of or relating to your use of, or conduct in connection with, the
          Website, Services, the Pragma Network or Pragma future Tokens,
          Distributed Ledger Technology assets associated with your Distributed
          Ledger Technology Address, any other digital assets, any Feedback or
          User Content; your violation of these Terms; your violation of
          Applicable Law or regulations; any claims made by or against the
          Protected Parties by other members of the organization or entity on
          whose behalf you may be using the Website or Services; or your
          infringement or misappropriation of the rights of any other person or
          entity. If you are obligated to indemnify any Protected Party, the
          Foundation (or, at its discretion, the applicable Protected Party)
          will have the right, in its sole discretion, to control any action or
          proceeding and to determine whether the Foundation wishes to settle,
          and if so, on what terms. <br /> <br />
          <h5 className="text-mint">8. DISCLOSURES; DISCLAIMERS</h5> <br /> The
          Foundation seeks to encourage the continued growth and success of the
          Pragma Network as a public good. The Foundation does not operate a
          virtual currency or derivatives exchange platform or offer trade
          execution or clearing services and therefore has no oversight,
          involvement, or control with respect to your transactions, including
          Pragma future Token purchases and sales. You are responsible for
          complying with all laws and regulations applicable to your
          transactions, including, but not limited to, the Commodity Exchange
          Act and the regulations promulgated thereunder by the U.S. Commodity
          Futures Trading Commission (“CFTC”), and the federal securities laws
          and the regulations promulgated thereunder by the U.S. Securities and
          Exchange Commission (“SEC”). You understand that the Foundation is not
          registered or licensed by the CFTC, SEC or any financial regulatory
          authority. No financial regulatory authority has reviewed or approved
          the use of the open-source software utilized by the Pragma Network.
          The Website, the Services, and the Pragma open-source software do not
          constitute advice or a recommendation concerning any commodity,
          security or other asset. The Foundation is not acting as an investment
          adviser or commodity trading adviser to any person. The Foundation
          does not own or control the underlying software protocols that are
          used in connection with the Pragma future Tokens. In general, the
          underlying protocols are open-source and anyone can use, copy, modify,
          and distribute them. the Foundation is not responsible for the
          operation of the underlying protocols, and the Foundation makes no
          guarantee of their functionality, security, or availability. To the
          maximum extent permitted under Applicable Law, the Website and the
          Services (and any of their content or functionality) provided by or on
          behalf of us are provided on an “AS IS” and “AS AVAILABLE” basis, and
          we expressly disclaim, and you hereby waive, any representations,
          conditions or warranties of any kind, whether express or implied,
          legal, statutory or otherwise, or arising from statute, otherwise in
          law, course of dealing, or usage of trade, including, without
          limitation, the implied or legal warranties and conditions of
          merchantability, merchantable quality, quality or fitness for a
          particular purpose, title, security, availability, reliability,
          accuracy, quiet enjoyment and non-infringement of third party rights.
          Without limiting the foregoing, we do not represent or warrant that
          the Website or the Services (including any related data) will be
          uninterrupted, available at any particular time or error-free.
          Further, we do not warrant that errors in the Website or the Service
          are correctable or will be corrected. You acknowledge that your User
          Code or User Content may be made public and your data on the Website
          or through the Services may become irretrievably lost or corrupted or
          temporarily unavailable due to a variety of causes, and agree that, to
          the maximum extent permitted under Applicable Law, we will not be
          liable for any loss or damage caused by denial-of-service attacks,
          software failures, misconduct by third-party service providers on the
          Pragma Network, viruses or other technologically harmful materials
          (including those which may infect your computer equipment), protocol
          changes by third party providers, Internet outages, force majeure
          events or other disasters, scheduled or unscheduled maintenance, or
          other causes either within or outside our control. The disclaimer of
          implied warranties contained in these Terms may not apply if and to
          the extent such warranties cannot be excluded or limited under the
          Applicable Law of the jurisdiction in which you reside. <br /> <br />
          <h5 className="text-mint">
            9. EXCLUSION OF CONSEQUENTIAL AND RELATED DAMAGES
          </h5>{" "}
          <br /> In no event will the Foundation, together with any Protected
          Party, be liable for any incidental, indirect, special, punitive,
          exemplary, consequential or similar damages or liabilities whatsoever
          (including, without limitation, damages for loss of data, information,
          revenue, goodwill, profits or other business or financial benefit)
          arising out of or in connection with the Website, the Services and the
          Pragma Network (and any of their content and functionality), any
          execution or settlement of a transaction, any performance or
          non-performance of the Services, your Distributed Ledger Technology
          assets, other digital assets, Pragma future Tokens or any other
          product, service or other item provided by or on behalf of a Protected
          Party, whether under contract, tort (including negligence), civil
          liability, statute, strict liability, breach of warranties, or under
          any other theory of liability, and whether or not any Protected Party
          has been advised of, knew of or should have known of the possibility
          of such damages and notwithstanding any failure of the essential
          purpose of these Terms or any limited remedy nor is the Foundation in
          any way responsible for the execution or settlement of transactions
          between users of Pragma open-source software or the Pragma Network.{" "}
          <br /> <br />
          <h5 className="text-mint">10. LIMITATION OF LIABILITY</h5> <br /> In
          no event will the Protected Parties&apos; aggregate liability arising
          out of or in connection with the Website, the Services and the Pragma
          Network (and any of their content and functionality), any performance
          or non-performance of the Services, your Distributed Ledger Technology
          assets, other digital assets, Pragma future Tokens or any other
          product, service or other item provided by or on behalf of a Protected
          Party, whether under contract, tort (including negligence), civil
          liability, statute, strict liability or other theory of liability
          exceed the amount of fees paid by you to us under these Terms in the
          twelve (12) month period immediately preceding the event giving rise
          to the claim for liability. <br /> <br />
          <h5 className="text-mint">11. RELEASE</h5> <br /> To the extent
          permitted by applicable law, in consideration for being allowed to use
          the Website, the Services and/or the Pragma Network, you and all other
          members of the entity or organization on whose behalf you are using
          the Website or Services and/or the Pragma Network hereby release and
          forever discharge the Foundation and all Protected Parties from, and
          hereby waive and relinquish, each and every past, present and future
          dispute, claim, controversy, demand, right, obligation, liability,
          action and cause of action of every kind and nature (including
          personal injuries, death, and property damage), that has arisen or
          arises directly or indirectly out of, or that relates directly or
          indirectly to, the Website, the Services and/or the Pragma Network
          (including any interactions with, or act or omission of, other Website
          or Pragma Network users or any third-party services). YOU HEREBY WAIVE
          ANY APPLICABLE PROVISION IN LAW OR REGULATION IN CONNECTION WITH THE
          FOREGOING, WHICH STATES IN SUBSTANCE: “A GENERAL RELEASE DOES NOT
          EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST
          IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF
          KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER
          SETTLEMENT WITH THE DEBTOR.” <br /> <br />
          <h5 className="text-mint">
            12. DISPUTE RESOLUTION AND ARBITRATION
          </h5>{" "}
          <br />
          Please read the following section carefully because it requires you to
          arbitrate certain disputes and claims with the Foundation and limits
          the manner in which you can seek relief from us, unless you opt out of
          arbitration by following the instructions set forth below. In
          addition, arbitration precludes you from suing in court or having a
          jury trial. You and the Foundation agree that any dispute arising out
          of or related to these Terms or our Services is personal to you and
          the Foundation and that any dispute will be resolved solely through
          individual action, and will not be brought as a class arbitration,
          class action or any other type of representative proceeding. Except
          for small claims disputes in which you or the Foundation seeks to
          bring an individual action in small claims court located in the county
          or other applicable jurisdiction where you reside or disputes in which
          you or the Foundation seeks injunctive or other equitable relief for
          the alleged unlawful use of intellectual property, you and the
          Foundation waive your rights to a jury trial and to have any dispute
          arising out of or related to these Terms or our Services resolved in
          court. Instead, for any dispute or claim that you have against the
          Foundation or relating in any way to the Services, you agree to first
          contact the Foundation and attempt to resolve the claim informally by
          sending a written notice of your claim (“Notice”) to the Foundation by
          email at{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>{" "}
          . The Notice must include your name, residence address, email address,
          and telephone number, describe the nature and basis of the claim and
          set forth the specific relief sought. Our notice to you will be
          similar in form to that described above. If you and the Foundation
          cannot reach an agreement to resolve the claim within thirty (30) days
          after such Notice is received, then either party may submit the
          dispute to binding arbitration administered by the American
          Arbitration Association (“AAA”), or, under the limited circumstances
          set forth above, in court. All disputes submitted to AAA will be
          resolved through confidential, binding arbitration before one
          arbitrator. Arbitration proceedings will be held in Geneva,
          Switzerland, in accordance with the AAA Consumer Arbitration Rules
          (“AAA Rules”). The most recent version of the AAA Rules are available
          on the AAA website and are hereby incorporated by reference. You
          either acknowledge and agree that you have read and understand the AAA
          Rules or waive your opportunity to read the AAA Rules and waive any
          claim that the AAA Rules are unfair or should not apply for any
          reason. You and the Foundation agree that the enforceability of this
          Section 12 will be substantively and procedurally governed by the
          Federal Arbitration Act, 9 U.S.C. § 1, et seq. (the “FAA”), to the
          maximum extent permitted by applicable law. As limited by the FAA,
          these Terms and the AAA Rules, the arbitrator will have exclusive
          authority to make all procedural and substantive decisions regarding
          any dispute and to grant any remedy that would otherwise be available
          in court, including the power to determine the question of
          arbitrability. The arbitrator may conduct only an individual
          arbitration and may not consolidate more than one individual&apos;s
          claims, preside over any type of class or representative proceeding or
          preside over any proceeding involving more than one individual. The
          arbitrator, the Foundation, and you will maintain the confidentiality
          of any arbitration proceedings, judgments and awards, including, but
          not limited to, all information gathered, prepared and presented for
          purposes of the arbitration or related to the disputes. The arbitrator
          will have the authority to make appropriate rulings to safeguard
          confidentiality, unless the law provides to the contrary. The duty of
          confidentiality does not apply to the extent that disclosure is
          necessary to prepare for or conduct the arbitration hearing on the
          merits, in connection with a court application for a preliminary
          remedy or in connection with a judicial challenge to an arbitration
          award or its enforcement, or to the extent that disclosure is
          otherwise required by law or judicial decision. You and the Foundation
          agree that for any arbitration you initiate, you will pay the filing
          fee and the Foundation will pay the remaining AAA fees and costs. For
          any arbitration initiated by the Foundation, the Foundation will pay
          all AAA fees and costs. You and the Foundation agree that the courts
          of Geneva sitting in Switzerland have exclusive jurisdiction over any
          appeals and the enforcement of an arbitration award. Any claim arising
          out of or related to these Terms or our Services must be filed within
          one year after such claim arose; otherwise, the claim is permanently
          barred, which means that you and the Foundation will not have the
          right to assert the claim. You have the right to opt out of binding
          arbitration within 30 days of the date you first accepted the terms of
          this Section 12 by emailing us at{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>{" "}
          . In order to be effective, the opt-out notice must include your full
          name and address and clearly indicate your intent to opt out of
          binding arbitration. If any portion of this Section 12 is found to be
          unenforceable or unlawful for any reason, the unenforceable or
          unlawful provision will be severed from these Terms, severance of the
          unenforceable or unlawful provision will have no impact whatsoever on
          the remainder of this Section 12 or the parties&apos; ability to
          compel arbitration of any remaining claims on an individual basis
          under this Section 12, and to the extent that any claims must
          therefore proceed on a class, collective, consolidated, or
          representative basis, such claims must be litigated in a civil court
          of competent jurisdiction and not in arbitration, and the parties
          agree that litigation of those claims will be stayed pending the
          outcome of any individual claims in arbitration. Further, if any part
          of this Section 12 is found to prohibit an individual claim seeking
          public injunctive relief, that provision will have no effect to the
          extent such relief is allowed to be sought out of arbitration, and the
          remainder of this Section 12 will be enforceable. By opting out of
          binding arbitration, you are agreeing to resolve disputes in
          accordance with Section 12. <br /> <br />
          <h5 className="text-mint">13. GOVERNING LAW</h5> <br /> The
          interpretation and enforcement of these Terms, and any dispute related
          to these Terms, the Website or the Services, will be governed by and
          construed and enforced in accordance with the laws of Switzerland, as
          applicable, without regard to conflict of law rules or principles
          (whether of Switzerland or any other jurisdiction) that would cause
          the application of the laws of any other jurisdiction. You agree that
          we may initiate a proceeding related to the enforcement or validity of
          our intellectual property rights in any court having jurisdiction.
          With respect to any other proceeding that is not subject to
          arbitration under these Terms, the courts located in Geneva will have
          exclusive jurisdiction. You waive any objection to venue in any such
          courts. <br /> <br />
          <h5 className="text-mint">13. RISK FACTORS</h5> <br /> You acknowledge
          the following serious risks to any use of the Website or the Services
          or the Pragma future Token and expressly agree to not hold any
          Protected Parties liable should any of the following risks occur:
          <br />
          <br />
          <div className="pl-8">
            <span className="font-bold text-mint opacity-50">
              - Risk of Regulatory Actions in One or More Jurisdictions:
            </span>{" "}
            The Website or the Services or the Pragma future Token could be
            impacted by one or more regulatory inquiries or regulatory actions,
            which could impede or limit the ability of the Foundation to
            continue to develop the Website or Services, or which could impede
            or limit your ability to use the Website or Services or the Pragma
            future Token.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Risk of Alternative, Unofficial Pragma Networks:
            </span>{" "}
            It is possible that alternative Pragma-based networks could be
            established, which utilize the same open source code and open source
            protocol underlying the Pragma Network and/or Services. The Pragma
            Network may compete with these alternative Pragma-based networks,
            which could potentially negatively impact the Pragma Network, the
            Services and/or the Pragma future Token. <br /> <br />{" "}
            <span className="font-bold text-mint opacity-50">
              - Risk of Insufficient Interest in the Pragma Network or
              Distributed Applications:
            </span>{" "}
            It is possible that the Pragma Network will not be used by a large
            number of external businesses, individuals, and other organizations
            and that there will be limited public interest in the creation and
            development of distributed applications. Such a lack of interest
            could impact the development of the Pragma Network and potential
            uses of Pragma future Tokens. The Foundation cannot predict the
            success of its own development efforts or the efforts of other third
            parties. <br /> <br />{" "}
            <span className="font-bold text-mint opacity-50">
              - Risk that the Website and Services, as Developed, Will Not Meet
              the Expectations of User:
            </span>{" "}
            You recognize that the Website, Services and the Pragma Network are
            under development and may undergo significant changes over time. You
            acknowledge that any expectations regarding the form and
            functionality of the Pragma Network held by you may not be met for
            any number of reasons including a change in the design and
            implementation plans, specifications and execution of the
            implementation of the Website, Services or the Pragma Network.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Risk of Security Weaknesses in the Pragma Network Core
              Infrastructure Software:
            </span>{" "}
            The Website, Services and the Pragma Network rest on open-source
            software, and there is a risk that the Protected Parties, or other
            third parties not directly affiliated with the Foundation, may
            introduce weaknesses or bugs into the core infrastructural elements
            of the Website, Services or the Pragma Network causing the system to
            lose Pragma future Tokens stored in one or more of your accounts or
            other accounts or lose sums of other valued tokens. Furthermore,
            despite our good faith efforts to develop and maintain the Website,
            Services and the Pragma Network, the Website, Services and the
            Pragma Network may experience malfunctions or otherwise fail to be
            adequately developed or maintained, which may negatively impact the
            Website, Services, the Pragma Network and Pragma future Tokens.
            <br /> <br />{" "}
            <span className="font-bold text-mint opacity-50">
              - Risk of Weaknesses or Exploitable Breakthroughs in the Field of
              Cryptography:
            </span>{" "}
            Cryptography is an art, not a science. And the state of the art can
            advance over time. Advances in code cracking, or technical advances
            such as the development of quantum computers, could present risks to
            cryptocurrencies and the Website, Services and the Pragma Network
            which could result in the theft or loss of Pragma future Tokens. To
            the extent within its control and otherwise possible, the Foundation
            intends to update the protocol underlying the Services and the
            Pragma Network to account for any advances in cryptography and to
            incorporate additional security measures, but it cannot predict the
            future of cryptography or guarantee that any security updates will
            be made in a timely or successful manner.
            <br /> <br />{" "}
            <span className="font-bold text-mint opacity-50">
              - Risk of Blockchain Network Attacks:
            </span>{" "}
            Any blockchain used for the Services and/or the Pragma Network may
            be susceptible to mining attacks, including but not limited to:
            double-spend attacks, reorganizations, majority mining power
            attacks, “selfish-mining” attacks, and work race condition attacks.
            Any successful attacks present a risk to the Services, the Pragma
            Network, expected proper execution and sequencing of transactions,
            and expected proper execution and sequencing of contract
            computations. Known or novel mining attacks may be successful.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Risk of Rapid Adoption and Insufficiency of Computational
              Application Processing Power of the Services and the Pragma
              Network:
            </span>{" "}
            If the Services and/or the Pragma Network are rapidly adopted, the
            demand for transaction processing and distributed application
            computations could rise dramatically and at a pace that exceeds the
            rate with which Pragma services can be provided. Under such a
            scenario, the Services and Pragma Network could become destabilized,
            due to the increased cost of running distributed applications. In
            turn, this could dampen interest in the Services, the Pragma Network
            and Pragma future Tokens. Insufficiency of computational resources
            and an associated rise in the price of Pragma future Tokens could
            result in businesses being unable to acquire scarce computational
            resources to run their distributed applications. This could result
            in lost revenues and disruption or halting of business operations.
            <br /> <br />{" "}
            <span className="font-bold text-mint opacity-50">
              - Risks Associated with New and Evolving Laws:
            </span>{" "}
            The Pragma Network, and by extension the Website and Services, may
            be subject to a variety of international laws and regulations,
            including those with respect to financial or securities regulations,
            consumer privacy, data protection, consumer protection, content
            regulation, network neutrality, cyber security, data protection,
            intellectual property (including copyright, patent, trademark and
            trade secret laws), defamation, and others. Such laws and
            regulations, and the interpretation or application of these laws and
            regulations, could change. In addition, new laws or regulations
            affecting the Pragma Network could be enacted. As the Website,
            Services and Pragma Network evolve, we may be subject to new laws,
            and the application of existing laws to us might change. These laws
            and regulations are frequently costly to comply with and may divert
            a significant portion of the Foundation&apos;s attention and
            resources or restrict the way the Pragma may operate. If we fail to
            comply with these applicable laws or regulations, we could receive
            negative publicity and be subject to significant liabilities which
            could adversely impact the Website, Services, and the Pragma Network
            and Pragma future Tokens. Additionally, Pragma node operators of the
            Pragma Network may be subject to industry specific laws and
            regulations or licensing requirements. If any of these parties fails
            to comply with any of these licensing requirements or other
            applicable laws or regulations, or if such laws and regulations or
            licensing requirements become more stringent or are otherwise
            expanded, the Pragma Network and/or Pragma future Tokens could be
            adversely impacted.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Market Risks:
            </span>{" "}
            Pragma future Tokens are intended to be used solely in connection
            with the Pragma Network, and we do not support or otherwise
            facilitate any secondary trading or external valuation of Pragma
            future Tokens. This restricts the contemplated avenues for using
            Pragma future Tokens, and could therefore create Pragma risk to
            Pragma future Tokens you hold. Even if secondary trading of Pragma
            future Tokens is facilitated by third party exchanges, such
            exchanges may be relatively new and subject to little or no
            regulatory oversight, making them more susceptible to market-related
            risks. Furthermore, to the extent that third parties do ascribe an
            external exchange value to Pragma future Tokens (e.g., as
            denominated in a digital or fiat currency), such value may be
            extremely volatile and diminish to zero.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Specific Risks Relating to Value and Function of Pragma future
              Tokens:
            </span>{" "}
            The utility benefits of using Pragma future Tokens to access
            services provided by Pragma node operators can only materialize
            through user-driven adoption over time. Such adoption depends on a
            variety of factors, including the pace of user adoption, the organic
            community-driven expansion of the Pragma Network. As such, the
            extent of user adoption is entirely outside of our control and
            cannot be stated with any certainty. The price of Pragma future
            Tokens may fluctuate in response to competitive and market
            conditions affecting the general supply of and demand for
            user-requested services. These conditions are beyond our control.
            The value of Pragma future Tokens on the Pragma Network may be lower
            than the price at which it was purchased. The utility of Pragma
            future Tokens, and any value associated with that utility, will
            depend on the ability of the Pragma Network to adequately facilitate
            user-requested services. Inadequate supply may result in such
            services taking more time, while inadequate demand may make it
            difficult to obtain services, both of which may discourage
            participation in the Pragma Network. The compensation for providing
            Pragma node services in the Pragma Network will depend on the resale
            price for the Pragma future Tokens received for such services, which
            may be lower than the compensation that might have been received
            through other arrangements. No promises of future performance or
            value are or will be made with respect to Pragma future Token,
            including no promise of inherent value, no promise of continuing
            payments, and no guarantee that Link Token will hold any particular
            value.
            <br /> <br />
            <span className="font-bold text-mint opacity-50">
              - Unanticipated Risks:
            </span>{" "}
            Cryptographic tokens such as Pragma future Tokens are a new and
            untested technology. In addition to the risks included in these
            Terms, there are other risks associated with the Services, the
            Pragma Network and Pragma future Tokens, including those that the
            Foundation cannot anticipate. Such risks may further materialize as
            unanticipated variations or combinations of the risks discussed in
            these Terms.
          </div>{" "}
          <br /> <br />
          <h5 className="text-mint">15. MISCELLANEOUS</h5> <br /> Any right or
          remedy of the Foundation set forth in these Terms is in addition to,
          and not in lieu of, any other right or remedy whether described in
          these Terms, under Applicable Law, at law or in equity. Our failure or
          delay in exercising any right, power, or privilege under these Terms
          will not operate as a waiver thereof. The invalidity or
          unenforceability of any of these Terms will not affect the validity or
          enforceability of any other of these Terms, all of which will remain
          in full force and effect. We will have no responsibility or liability
          for any failure or delay in performance of the Website or any of the
          Services, or any loss or damage that you may incur, due to any
          circumstance or event beyond our control, including without limitation
          any flood, extraordinary weather conditions, earthquake, or other act
          of God, fire, war, insurrection, riot, labor dispute, accident, action
          of government, communications, power failure, or equipment or software
          malfunction. You may not assign or transfer any right to use the
          Website or the Services, or any of your rights or obligations under
          these Terms, without our express prior written consent, including by
          operation of law or in connection with any change of control. We may
          assign or transfer any or all of our rights or obligations under these
          Terms, in whole or in part, without notice or obtaining your consent
          or approval. Headings of sections are for convenience only and will
          not be used to limit or construe such sections. These Terms contain
          the entire agreement and supersede all prior and contemporaneous
          understandings between the parties regarding the Website and the
          Services. If there is a conflict between these Terms and any other
          agreement you may have with us, these Terms will control unless the
          other agreement specifically identifies these Terms and declares that
          the other agreement supersedes these Terms. <br /> <br />
          <h5 className="text-mint">CONTACT INFORMATION:</h5> <br />
          Email:{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>{" "}
          <br /> © 2023 ZkPad Sa All rights reserved. <br />
          All trademarks, logos and service marks displayed on the Website and
          the Pragma Network are our property or the property of other third
          parties. <br /> <br />
          <h5 className="text-mint">Trademark Guidelines</h5> <br /> ZkPad SA
          (the “Foundation”) has developed these guidelines (“Guidelines”) to
          ensure that the Foundation trademarks and service marks (“Marks”) are
          properly displayed and used. As the owner of its Marks, the Foundation
          has exclusive rights to use its Marks and is obligated to prevent
          others from using its Marks inappropriately. If use of the
          Foundation&apos;s Marks is authorized, it is expected that you will
          comply in all respects with the requirements and conditions set forth
          in these Guidelines and in any other guidelines promulgated by the
          Foundation. Nothing contained in these Guidelines should be construed
          as granting, by implication, estoppel, or otherwise, any license or
          right in and to the Marks or other intellectual property owned by the
          Foundation. Unauthorized use of any of the Marks or the
          Foundation&apos;s other intellectual property may violate the law. All
          rights not expressly granted herein are reserved by the Foundation.{" "}
          <br /> <br />
          <h5 className="text-mint">PROHIBITED USE</h5> <br /> In order to
          ensure that you do not infringe on any the Marks, you must avoid doing
          any of the following without the prior written permission of the
          Foundation:
          <div className="pl-8">
            <br /> - Using a Mark in a manner that is likely to directly or
            indirectly imply either an affiliation with or an endorsement by the
            Foundation of specific products, goods, services, materials,
            courses, or programs.
            <br /> - Using the Pragma logo or any Foundation logo in your
            materials. <br /> - Using a Mark in a manner that is likely to
            confuse the public about the origin of products, goods, services,
            materials, courses, or programs.
            <br /> - Using a mark similar enough to a Mark owned by the
            Foundation that it could be confused for a Foundation Mark
            (considering visual, phonetic and connotations of the marks).
            <br /> - Altering, adapting, modifying, animating or morphing any
            Marks.
            <br /> - Using the Foundation name or Marks as the visual focal
            point of any materials. <br /> - Using a Mark in a manner that is
            likely to dilute, defame, disparage, or harm the reputation of the
            Foundation or the Pragma network.
          </div>{" "}
          <br /> <br />
          <h5 className="text-mint">
            PERMISSIBLE REFERENCES TO FOUNDATION MATERIALS
          </h5>{" "}
          <br /> The Foundation acknowledges that the use of Marks may be
          necessary to describe the subject matter of some materials, products,
          and/or programs. Consequently, the Foundation does allow descriptive
          uses of its Marks; however, the name of the Foundation and other
          Marks, may be used only when necessary to describe the subject matter
          of the materials, products, and/or programs. All uses must be accurate
          and descriptive in nature so there is no likelihood of confusion to
          the public. <br /> <br />
          <h5 className="text-mint">
            TRADEMARK PERMISSION REQUESTS
          </h5> <br /> To request permission to use a Pragma Mark, please
          contact us at{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>
          . <br /> <br />
          <h5 className="text-mint">DISCLAIMER</h5> <br /> These Guidelines are
          not intended to serve as legal advice. Should you have questions
          regarding your legal rights or duties, please consult your own
          attorney. Should you have further questions regarding the policies of
          the Foundation with respect to its Marks, please contact{" "}
          <Link
            className="text-mint underline"
            href={"mailto:legal@pragma.build"}
          >
            legal@pragma.build
          </Link>
          .
        </div>
      </div>
    </BoxContainer>
  );
};

export default terms;
