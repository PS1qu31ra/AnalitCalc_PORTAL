

import {
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

import WorldMap from "react-svg-worldmap";

import type {
  CountryContext,
  ISOCode,
} from "react-svg-worldmap";

import {
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import type {
  Language,
} from "@/lib/i18n/translations";

import {
  HOME_COPY,
} from "@/lib/portal/home-copy";

import styles from "./HomePortal.module.css";


type CountryData = {
  country: ISOCode;
  value: number;
};


type ReachResponse = {
  ok: boolean;

  countries?: {
    country: string;
    value: number;
  }[];
};


export default function ReachMap({
  language,
}: {
  language: Language;
}) {
  const t =
    HOME_COPY[language];

  const [
    data,
    setData,
  ] =
    useState<CountryData[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  useEffect(() => {
    let active =
      true;


    async function load() {
      try {
        const response =
          await fetch(
            "/api/analytics/reach",
            {
              cache: "no-store",
            }
          );


        const result =
          (await response.json()) as ReachResponse;


        if (
          active &&
          result.ok &&
          result.countries
        ) {
          const countries =
            result.countries
              .filter(
                (item) =>
                  item.country.length === 2
              )
              .map(
                (item) => ({
                  country:
                    item.country
                      .toLowerCase() as ISOCode,

                  value:
                    Number(item.value),
                })
              );


          setData(countries);
        }
      } catch {
        if (active) {
          setData([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }


    load();


    return () => {
      active = false;
    };
  }, []);


  const totalVisitors =
  useMemo(
      () =>
        data.reduce(
          (
            total,
            item
          ) =>
            total +
            item.value,
          0
        ),
      [data]
    );


  function styleFunction({
    countryValue,
  }: CountryContext):
    CSSProperties {
    const reached =
      countryValue !==
      undefined;


    return {
      fill:
        reached
          ? "#b11218"
          : "#d4d4d4",

      fillOpacity: 1,

      stroke: "#ffffff",

      strokeWidth: 0.7,

      strokeOpacity: 1,

      cursor:
        reached
          ? "pointer"
          : "grab",

      transition:
        "fill 160ms ease",
    };
  }


  return (
    <div
      className={
        styles.mapCard
      }
    >
      <div
        className={
          styles.mapHeader
        }
      >
        <div
          className={
            styles.mapStats
          }
        >
          <div
            className={
              styles.mapStat
            }
          >
            <strong>
              {data.length}
            </strong>

            <span>
              {t.countries}
            </span>
          </div>


          <div
            className={
              styles.mapStat
            }
          >
            <strong>
            {totalVisitors}
            </strong>

            <span>
              {t.accesses}
            </span>
          </div>
        </div>


        <div
          className={
            styles.mapLegend
          }
        >
          <span>
            <i
              className={
                styles.legendReached
              }
            />

            {language === "pt-BR"
              ? "Com acessos"
              : "Reached"}
          </span>

          <span>
            <i
              className={
                styles.legendPending
              }
            />

            {language === "pt-BR"
              ? "Sem registro"
              : "No records"}
          </span>
        </div>
      </div>


      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={6}
        centerOnInit
        centerZoomedOut
        wheel={{
          step: 0.12,
        }}
        pinch={{
          step: 5,
        }}
        doubleClick={{
          step: 0.8,
        }}
      >
        {({
          zoomIn,
          zoomOut,
          resetTransform,
        }) => (
          <div
            className={
              styles.mapViewer
            }
          >
            <div
              className={
                styles.mapControls
              }
            >
              <button
                type="button"
                onClick={() =>
                  zoomIn()
                }
                aria-label={
                  language === "pt-BR"
                    ? "Aumentar zoom"
                    : "Zoom in"
                }
              >
                +
              </button>

              <button
                type="button"
                onClick={() =>
                  zoomOut()
                }
                aria-label={
                  language === "pt-BR"
                    ? "Diminuir zoom"
                    : "Zoom out"
                }
              >
                −
              </button>

              <button
                type="button"
                onClick={() =>
                  resetTransform()
                }
                aria-label={
                  language === "pt-BR"
                    ? "Redefinir mapa"
                    : "Reset map"
                }
              >
                ⟳
              </button>
            </div>


            <TransformComponent
              wrapperClass={
                styles.mapZoomWrapper
              }
              contentClass={
                styles.mapZoomContent
              }
            >
              <div
                className={
                  styles.mapWorld
                }
              >
                <WorldMap
                  data={data}

                  size="xxl"

                  color="#b11218"

                  backgroundColor="transparent"

                  borderColor="#ffffff"

                  frame={false}

                  title=""

                  styleFunction={
                    styleFunction
                  }

                  valueSuffix={
                    language === "pt-BR"
                      ? " visitantes"
                      : " visitors"
                  }

                  tooltipTextFunction={(
                    context
                  ) => {
                    if (
                      context.countryValue ===
                      undefined
                    ) {
                      return context.countryName;
                    }

                    return `${
                      context.countryName
                    }: ${
                      context.countryValue
                    } ${
                      language ===
"pt-BR"
  ? "visitantes"
  : "visitors"
                    }`;
                  }}
                />
              </div>
            </TransformComponent>


            <div
              className={
                styles.mapHint
              }
            >
              {language === "pt-BR"
                ? "Role para ampliar · arraste para explorar · use pinça no celular"
                : "Scroll to zoom · drag to explore · pinch on mobile"}
            </div>
          </div>
        )}
      </TransformWrapper>


      {!loading &&
        data.length === 0 && (
          <div
            className={
              styles.mapEmpty
            }
          >
            <span>
              ◎
            </span>

            <div>
              <strong>
                {language === "pt-BR"
                  ? "Mapa aguardando os primeiros registros"
                  : "Map waiting for the first records"}
              </strong>

              <p>
                {language === "pt-BR"
                  ? "Os países alcançados serão destacados em vermelho conforme os acessos forem registrados."
                  : "Reached countries will be highlighted in red as accesses are recorded."}
              </p>
            </div>
          </div>
        )}


      {loading && (
        <p
          className={
            styles.mapStatus
          }
        >
          {t.loading}
        </p>
      )}
    </div>
  );
}