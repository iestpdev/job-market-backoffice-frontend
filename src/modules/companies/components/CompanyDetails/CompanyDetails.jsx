import "./CompanyDetails.css";

export default function CompanyDetails({ company }) {
    if (!company) return <p>No se encontró información de la empresa.</p>;

    const {
        RAZON_SOCIAL, RUC, RUBRO, DIRECCION1, DIRECCION2,
        CONTACTO1, TELEFONO1, CORREO1,
        CONTACTO2, TELEFONO2, CORREO2,
        CONTACTO3, TELEFONO3, CORREO3,
        LOGO
    } = company;

    return (
        <div className="company-details-card">
            <h2 className="company-name">{RAZON_SOCIAL}</h2>
            {LOGO && (
                <div className="company-logo">
                    <img src={LOGO} alt="Logo de la empresa" />
                </div>
            )}
            <div className="company-info-item"><strong>RUC:</strong> {RUC}</div>
            <div className="company-info-item"><strong>Rubro:</strong> {RUBRO}</div>
            <div className="company-info-item"><strong>Dirección 1:</strong> {DIRECCION1}</div>
            <div className="company-info-item"><strong>Dirección 2:</strong> {DIRECCION2}</div>

            {[1, 2, 3].map(n => {
                const nombre = company[`CONTACTO${n}`];
                const tel = company[`TELEFONO${n}`];
                const correo = company[`CORREO${n}`];
                return nombre || tel || correo ? (
                    <div className="company-contact" key={n}>
                        <h3>Contacto {n}</h3>
                        {nombre && <div><strong>Nombre:</strong> {nombre}</div>}
                        {tel && <div><strong>Teléfono:</strong> {tel}</div>}
                        {correo && <div><strong>Correo:</strong> {correo}</div>}
                    </div>
                ) : null;
            })}
        </div>
    );
}