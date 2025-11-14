// ClientImages.js
const images = import.meta.glob("../../../assets/clients/client-img-*.jpg", { eager: true });

const ClientImages = Object.values(images).map((img) => img.default);

export default ClientImages;