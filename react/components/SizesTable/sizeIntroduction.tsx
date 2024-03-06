import React from "react";

const requestToAPI = async (gender: any) => {
    const response = await fetch(
        `https://strapi-master-prd-eqjekncm6q-ue.a.run.app/api/gender-infos?filters[name][$eq]=${gender}&populate=*`
    );
    const data = await response.json();
    //If its empty, return an empty array
    return data.data || [];
};
interface Props {
    gender: string;
}
export default function Introduction({ gender }: Props) {
    const [info, setInfo] = React.useState<string>("");
    const [img, setImg] = React.useState<string>("");

    React.useEffect(() => {
        const fetchGenderInfo = async () => {
            const genderInfo = await requestToAPI(gender);
            setInfo(genderInfo[0].attributes.info);
            setImg(genderInfo[0].attributes.img.data[0].attributes.url);
        };
        fetchGenderInfo();
    });

    return (
        <section className="size-guide__introduction">
            {
                //Image
                info ? <img src={img} alt={gender} /> : null
            }
            <div className="size-guide__introduction-text">
                <p>
                    {
                        //Text from strapi
                        //Buscar punto y final, hacer un split y mostrarlo en parrafos
                        info
                            ? info
                                  .split(".")
                                  .slice(0, -1)
                                  .map((paragraph: string) => {
                                      return <p key={paragraph}>{paragraph}</p>;
                                  })
                            : null
                    }
                </p>
            </div>
        </section>
    );
}
