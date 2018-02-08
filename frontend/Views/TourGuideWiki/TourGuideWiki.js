import React, { Component } from "react";

import appLayout from "SharedStyles/appLayout.css";
import { connect } from "react-redux";
import _ from "lodash";
import styles from "./styles.css";
import classNames from "classnames/bind";
import * as actions from "./actions";
import GncSlides from "../../Components/SlideShow/gncSlides";
import MaterialButton from "../../Components/Button/MaterialButton";

class TourGuideWiki extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  renderCard() {
    const { gnc } = this.props;
    return _.map(gnc, eachOne => {
      return (
        <div className="card" key={eachOne._id}>
          <div className="card-header">{eachOne.name}</div>
          <img
            className={classNames(styles.imageStyle, "card-img-top")}
            src={eachOne.img}
            alt="Card image cap"
            width="70%"
          />
          <div className="card-block">
            <h4 className="card-title">功效</h4>
            <p className="card-text">{eachOne.desc}</p>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={appLayout.constraintWidth}>
        <div className="blog-header">
          <div className="container">
            <h3 className={classNames(styles.fontStyle, "blog-title")}>
              GNC产品全介绍
            </h3>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="row">
            <div className="col-sm-8 blog-main">
              <div className="blog-post">
                <div style={{ marginTop: 8 }}>
                  <GncSlides
                    img1="/src/static/images/gnc1.jpg"
                    link1="https://www.google.com/maps/place/1748 Decoto Rd, Union City CA 94587"
                    img2="/src/static/images/gnc2.jpg"
                    link2="https://www.google.com/maps/place/9875 s Eastern ave Las Vegas, NV 89123"
                  />
                </div>
                <div>
                  <div className={styles.rowBetweenStyle}>
                    <div style={{ marginTop: 20 }}>
                      <a href="https://www.google.com/maps/place/9875 s Eastern ave Las Vegas, NV 89123">
                        拉斯店:9875 s Eastern ave Las Vegas, NV 89123
                      </a>
                    </div>
                    <div>
                      <a href="https://www.google.com/maps/place/1748 Decoto Rd, Union City CA 94587">
                        旧金山店:1748 Decoto Rd, Union City CA 94587
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <a href="tel:7026825716">预约电话：702-682-5716</a>
                </div>

                <hr />
                <h3 className="blog-post-title">产品全介绍:</h3>

                <p className="blog-post-meta">
                  January 1, 2018 by{" "}
                  <a href="tel:7026825716">旧金山及拉斯GNC店Owner:Chris</a>
                </p>
                <div className={classNames(styles.rowStyle, styles.imgStyle)}>
                  <img
                    className={classNames(styles.imageStyle, "card-img-top")}
                    src="/src/static/images/joints.jpeg"
                    width="40%"
                    height="auto"
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 3
                    }}
                  >
                    引用一下Chris的客户的评价：
                    我建议我的一位客人（他叫Bryan,50多岁了，就住在拉斯维加斯)吃维骨力，他腰肌劳损，膝关节疼，自己一直以为是长骨刺呢，来之前去医院拍片做了检查，发现原来是常见的软骨磨损，我建议他吃我家的维骨力，吃法是早上一粒速效及一粒普通维骨力，晚上也是这个吃法，这几瓶还没吃完时候，他已经好的差不多了，本来就不吃了，但是他还坚持连续吃，因为他认为之前有关节疼这毛病，多吃段时间没坏处，让软骨修复过来，以后就可吃可不吃了，我也很支持他。再多吃几瓶的情况下，现在已经开始在拉斯旁的24hrs
                    fitness开始办理健身卡了，50多岁的人甚至开始做卧推等运动了，连我都难以置信。
                  </p>
                </div>

                <blockquote>
                  <p>
                    现在国人越来越了解维骨力的重要性，很多情况，爬不动楼梯，腰酸背痛等症状并不是单纯的缺钙导致的，随着人体的老化，软骨关节开始磨损，需要补充软骨所必须的葡萄萄糖氨来防止软骨的老化。GNC的这款维骨力，是美国人最认可的品牌。防止软骨老化的同时，其MSM的使用可以减少软骨的疼痛，这是老美认可此产品的主要原因之一。
                  </p>
                </blockquote>
                {/* 2商品 */}

                <div className={classNames(styles.rowStyle, styles.imgStyle)}>
                  <img
                    className={classNames(styles.imageStyle, "card-img-top")}
                    src="/src/static/images/coQ10.jpg"
                    width="40%"
                    height="auto"
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 3
                    }}
                  >
                    辅酶Q10，英文是CoQ10.是人体内本身含有的重要酵素。科学家经研究发现，体内的辅酶Q10含量和寿命长短成正比。辅酶Q10是体内产生抗氧化物防止自由基的主要媒介，这也是为什么摄取辅酶Q10的人更年轻，越来越多的化妆品也开始加入辅酶Q10.
                    辅酶Q10随着年龄的增长开始流失，其对心脏细胞的维护也因为它的流失开始体现的越来越明显。80%以上的老年人心衰，罪魁祸首就是体内缺乏辅酶Q10对心脏的维护。所以，这也是为很么我的老年客人（Chris拉斯店的客户），在医生的敦促下前往店中购买辅酶Q10，无数其中的患者不仅得到改善还称赞说：“服用了辅酶Q10以后，我晚上再也没有被呼吸不畅而憋醒过，每晚都能够一觉睡到天亮”。
                  </p>
                </div>

                <blockquote>
                  <p>
                    Chris十分注重自己和妻子的健康，他们也是CoQ10的受益者，同时，他建议中年人也千万不要忽视自己的心血管问题。毕竟心血管疾病早已超过癌症成为世界最潜在也是最大的杀手。CoQ10对于心血管疾病，是目前公认的最好的酵素，这也是为什么连美国的医生都把CoQ10列入了家庭常用保健药物。
                  </p>
                </blockquote>

                <ul>{this.renderCard()}</ul>
              </div>

              <nav className="blog-pagination">
                <a className="btn btn-outline-primary" href="#">
                  Older
                </a>

                <a className="btn btn-outline-secondary disabled" href="#">
                  Newer
                </a>
              </nav>
            </div>

            <div className="col-sm-3 offset-sm-1 blog-sidebar">
              <div className="sidebar-module sidebar-module-inset">
                <h4>关于:</h4>

                <p>
                  在原有拉斯维加斯GNC店基础上，Chris于2017年建设了旧金山门店，门店全部聘请有保健品销售资质的老外导购，为各位奉上最佳的GNC购买体验。
                </p>
              </div>

              <div className="sidebar-module">
                <h5>拉斯:</h5>
                <span>
                  <a href="https://www.google.com/maps/place/9875 s Eastern ave Las Vegas, NV 89123">
                    9875 s Eastern ave Las Vegas, NV 89123
                  </a>
                </span>
                <h5>旧金山:</h5>
                <span>
                  <a href="https://www.google.com/maps/place/1748 Decoto Rd, Union City CA 94587">
                    1748 Decoto Rd, Union City CA 94587
                  </a>
                </span>
                <h5>致电:</h5>
                <span>
                  <a href="tel:7026825716">702-682-5716</a>
                </span>
              </div>
              <MaterialButton
                name1="导航旧金山店"
                name2="导航拉斯店"
                link1="https://www.google.com/maps/place/1748 Decoto Rd, Union City CA 94587"
                link2="https://www.google.com/maps/place/9875 s Eastern ave Las Vegas, NV 89123"
                name3="致电"
                link3="tel:7026825716"
              />

              {/* <div className="sidebar-module">
                <h4>Elsewhere</h4>

                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>

                  <li>
                    <a href="#">Twitter</a>
                  </li>

                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gnc }) {
  return { gnc };
}

export default connect(mapStateToProps, actions)(TourGuideWiki);
