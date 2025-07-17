import "./Home.css";

export const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-welcome-box">
                <h1 className="home-title">🎓 Bienvenido al Panel de Gestión para Bolsa Laboral</h1>
                <p className="home-subtitle">
                    Esta plataforma te permite administrar eficientemente <strong>ofertas laborales</strong>,
                    <strong> estudiantes</strong>, <strong>empresas</strong>, <strong>postulaciones</strong>, y
                    <strong> tutores</strong> de forma centralizada.
                </p>
                <p className="home-description">
                    Desde aquí podrás registrar nuevas oportunidades, hacer seguimiento a postulaciones, gestionar usuarios y asegurar
                    una experiencia fluida para todos los actores del sistema. ¡Tu herramienta ideal para conectar talento con oportunidades! 🚀
                </p>
            </div>
        </div>
    );
};
