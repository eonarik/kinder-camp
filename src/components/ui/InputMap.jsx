import React, { Component } from "react";

// import _TRANS from "../../const/trans";
import { notyConfig, ymapsApiKey } from "../../config";

import ymaps from "ymaps";

const Noty = require("noty");
Noty.overrideDefaults(notyConfig);

class InputMap extends Component {
  map = null;
  maps = null;
  placemark = null;

  static defaultProps = {
    id: null,
    label: null,
    name: "",
    defaultValue: "",
    mapType: "static"
  };

  state = {
    staticMap: ""
  };

  geocode = (change = true) => {
    let request = window.document.getElementById(this.props.id).value;
    this.maps.geocode(request).then(
      res => {
        var obj = res.geoObjects.get(0),
          error,
          hint;

        if (obj) {
          switch (
            obj.properties.get("metaDataProperty.GeocoderMetaData.precision")
          ) {
            case "exact":
              break;
            case "number":
            case "near":
            case "range":
              error = "Неточный адрес, требуется уточнение";
              hint = "Уточните номер дома";
              break;
            case "street":
              error = "Неполный адрес, требуется уточнение";
              hint = "Уточните номер дома";
              break;
            case "other":
            default:
              error = "Неточный адрес, требуется уточнение";
              hint = "Уточните адрес";
          }
        } else {
          error = "Адрес не найден";
          hint = "Уточните адрес";
        }

        // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
        if (error) {
          console.log(error, hint);
          new Noty({
            text: error + "<br>" + hint,
            type: "error"
          }).show();
        } else {
          let mapContainerId = this.props.id + "-map";
          let mapContainer = window.document.getElementById(mapContainerId);
          let bounds = obj.properties.get("boundedBy");
          // Рассчитываем видимую область для текущего положения пользователя.
          let mapState = this.maps.util.bounds.getCenterAndZoom(bounds, [
            mapContainer.offsetWidth,
            mapContainer.offsetHeight
          ]);
          let address = [obj.getCountry(), obj.getAddressLine()].join(", ");

          // Убираем контролы с карты.
          mapState.controls = [];

          if (this.props.mapType === "static") {
            let params = [
              // "key=" + ymapsApiKey,
              "l=map,skl",
              "ll=" + mapState.center[1] + "," + mapState.center[0],
              "z=16", //mapState.zoom
              "size=" +
                [mapContainer.offsetWidth, mapContainer.offsetHeight].join(","),
              "pt=" + mapState.center[1] + "," + mapState.center[0] + ",comma"
            ];
            this.setState({
              staticMap:
                "https://static-maps.yandex.ru/1.x/?" + params.join("&")
            });
          } else {
            // Сохраняем укороченный адрес для подписи метки.
            let shortAddress = [
              obj.getThoroughfare(),
              obj.getPremiseNumber(),
              obj.getPremise()
            ].join(" ");

            // Создаём карту.
            // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
            if (!this.map) {
              mapContainer.innerHTML = "";
              this.map = new this.maps.Map(mapContainerId, mapState);
              this.placemark = new this.maps.Placemark(
                this.map.getCenter(),
                { iconCaption: shortAddress, balloonContent: shortAddress },
                { preset: "islands#redDotIconWithCaption" }
              );
              this.map.geoObjects.add(this.placemark);
              // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
            } else {
              this.map.setCenter(mapState.center, mapState.zoom);
              this.placemark.geometry.setCoordinates(mapState.center);
              this.placemark.properties.set({
                iconCaption: shortAddress,
                balloonContent: shortAddress
              });
            }
          }

          if (change) {
            this.props.onChange({
              [this.props.name]: JSON.stringify({
                address,
                country: obj.getCountry(),
                adm_area: obj.getAdministrativeAreas(),
                localities: obj.getLocalities(),
                center: mapState.center[1] + "," + mapState.center[0]
              })
            });
          }
        }
      },
      function(e) {
        console.log(e);
      }
    );
  };

  componentDidMount = () => {
    ymaps
      .load("https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=" + ymapsApiKey)
      .then(maps => {
        // Подключаем поисковые подсказки к полю ввода.
        this.maps = maps;
        new maps.SuggestView(this.props.id);

        if (this.props.defaultValue) {
          this.geocode(false);
        }
      });
  };

  render() {
    let props = this.props;
    return (
      <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <div className="input-group">
          <input
            id={props.id}
            name={props.name}
            type="text"
            className="form-control"
            defaultValue={props.defaultValue}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.geocode}
            >
              <i className="fa fa-check" />
            </button>
          </span>
        </div>
        <div id={props.id + "-map"} className="settings__map-empty">
          {this.state.staticMap ? (
            <img src={this.state.staticMap} alt="" />
          ) : (
            <div>
              После введения адреса
              <br />
              система автоматически
              <br />
              сформирует карту
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InputMap;
