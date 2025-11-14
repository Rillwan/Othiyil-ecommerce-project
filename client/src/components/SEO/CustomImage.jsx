
const CustomImage = ({
    src,
    alt,
    title,
    width,
    height,
    className = "",
    style = {},
    loading = "lazy",
}) => {
    // fallback if alt is missing
    const altText = alt || "Image";

    return (
        <picture>
            {/* Fallback image */}
            <img
                src={src}
                alt={altText}
                title={title || altText}
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                className={className}
                style={{
                    display: "block",
                    ...style,
                }}
            />
        </picture>
    );
};

export default CustomImage;
