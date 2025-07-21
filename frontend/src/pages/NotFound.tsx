import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title={t('not_found_title')}
            subTitle={t('not_found_subtitle')}
            extra={<Button type="primary" onClick={() => navigate('/')}>{t('back_home')}</Button>}
        />
    )
}

export default NotFound; 