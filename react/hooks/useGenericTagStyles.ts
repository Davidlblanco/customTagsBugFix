import { useEffect, useState } from 'react';
import { useGenericTags } from '../contexts/GenericTagsContext';
import { GenericTagsFront, Styles } from '../components/Cuotas/Types/PaymentCustom';

interface TagStylesHookResult {
    tagsPreview: GenericTagsFront | null;
    isLoading: boolean;
}

const useGenericTagStyles = (): TagStylesHookResult => {
    const [tagsPreview, setTagsPreview] = useState<GenericTagsFront | null>(null);
    const { tags, isLoading } = useGenericTags();

    useEffect(() => {
        if (!tags) return;

        const styles = {
            backgroundColor: getStyleValue(tags.styles, "backgroundColor"),
            borderColor: getStyleValue(tags.styles, "borderColor"),
            borderRadius: getStyleValue(tags.styles, "borderRadius"),
            fontSize: getStyleValue(tags.styles, "fontSize"),
            color: getStyleValue(tags.styles, "textColor"),
        };

        setTagsPreview({ ...tags, styles });
    }, [tags]);

    return { tagsPreview, isLoading };
};

const getStyleValue = (styles: Styles[], id: string) => {
    return styles?.find((style) => style.id === id)?.value;
};

export default useGenericTagStyles;