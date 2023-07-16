import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Hero from "@/components/molecules/Hero/Hero";
import GeneralLayout from "layouts/generalLayout";
import chipper from "assets/icons/chipper.svg";
import propel from "assets/icons/Propel.svg";
import nextford from "assets/icons/nextford.svg";
import panther from "assets/icons/panther.svg";
import rootlo from "assets/icons/rootlo.svg";
import safetyWing from "assets/icons/safetyWing.svg";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

import { generateUniqueId } from "@/utils/helper";
import {
  Faq,
  HomeJobs,
  MapWorkSpace,
  Newsletter,
  Talents,
} from "@/components/HomePageComponents";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPage = () => {
  const { locales, push } = useRouter();
  const { t: translate } = useTranslation("home");

  const globalCompanies = [
    chipper,
    nextford,
    panther,
    rootlo,
    propel,
    safetyWing,
  ];

  const handleClick = (l: string) => {
    push("/", undefined, {
      locale: l,
    });
  };

  return (
    <GeneralLayout locales={locales!} handleClick={handleClick}>
      <Head>
        <title>Afrisplash</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Hero translate={translate} />

      <section className="w-full my-10 mt-32">
        <div className="w-10/12 mx-auto space-y-10">
          <h3 className="text-center text-gray-400 text-2xl font-light">
            {translate("Trusted by these global companies")}
          </h3>
          <div className="flex justify-between ">
            {globalCompanies.map((item: any) => (
              <div key={generateUniqueId()}>
                <Image src={item} alt="global companies" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeJobs translate={translate} />
      <Talents translate={translate} />
      <MapWorkSpace translate={translate} />
      <Faq translate={translate} />
      <Newsletter translate={translate} />
    </GeneralLayout>
  );
};

type Props = {
  _nextI18Next?:
    | {
        initialI18nStore: any;
        initialLocale: string;
        ns: string[];
        userConfig: UserConfig | null;
      }
    | undefined;
};

type UserConfig = any;

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"], null, ["en", "no"])),
    },
  };
};

export default Home;
