import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Space, Select, Form } from 'antd';
import { SaveOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import './BrouillonsDetails.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const BrouillonsDetails = () => {
  const { id } = useParams();
  const [brouillon, setBrouillon] = useState(null);
  const [styleTexte, setStyleTexte] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    fontSize: '14px',
    color: '#000000'
  });
  const [champsPersonnalises, setChampsPersonnalises] = useState([]);
  const [editingLabel, setEditingLabel] = useState(null);

  useEffect(() => {
    // Simuler le chargement des détails du brouillon
    const brouillonFictif = {
      id: id,
      titre: "Développeur Full Stack",
      description: "Nous recherchons un développeur Full Stack expérimenté...",
      contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    };
    setBrouillon(brouillonFictif);
  }, [id]);

  const appliquerStyle = (propriete, valeur) => {
    setStyleTexte(prevStyle => ({ ...prevStyle, [propriete]: valeur }));
  };

  const ajouterChampPersonnalise = () => {
    const newField = { label: `Nouveau champ ${champsPersonnalises.length + 1}`, type: 'text', value: '' };
    setChampsPersonnalises([...champsPersonnalises, newField]);
    setEditingLabel(champsPersonnalises.length);
  };

  const supprimerChampPersonnalise = (index) => {
    const nouveauxChamps = champsPersonnalises.filter((_, i) => i !== index);
    setChampsPersonnalises(nouveauxChamps);
  };

  const modifierChampPersonnalise = (index, champ, valeur) => {
    const nouveauxChamps = [...champsPersonnalises];
    nouveauxChamps[index][champ] = valeur;
    setChampsPersonnalises(nouveauxChamps);
  };

  const toggleEditLabel = (index) => {
    setEditingLabel(editingLabel === index ? null : index);
  };

  const reinitialiserTypeChamp = (index) => {
    const nouveauxChamps = [...champsPersonnalises];
    nouveauxChamps[index].type = '';
    setChampsPersonnalises(nouveauxChamps);
  };

  const publierBrouillon = () => {
    // Logique pour publier le brouillon
    console.log("Brouillon publié :", brouillon);
    // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
  };

  if (!brouillon) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="brouillons-details-container">
      <Title level={2}>Détails du brouillon</Title>
      <Form layout="vertical">
        <Form.Item label="Titre">
          <Input value={brouillon.titre} onChange={(e) => setBrouillon({ ...brouillon, titre: e.target.value })} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={brouillon.description}
            onChange={(e) => setBrouillon({ ...brouillon, description: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Contenu">
          <div className="contenu-edition">
            <div className="palette-edition">
              <Button icon={<BoldOutlined />} onClick={() => appliquerStyle('fontWeight', styleTexte.fontWeight === 'bold' ? 'normal' : 'bold')} />
              <Button icon={<ItalicOutlined />} onClick={() => appliquerStyle('fontStyle', styleTexte.fontStyle === 'italic' ? 'normal' : 'italic')} />
              <Button icon={<UnderlineOutlined />} onClick={() => appliquerStyle('textDecoration', styleTexte.textDecoration === 'underline' ? 'none' : 'underline')} />
              <Button icon={<AlignLeftOutlined />} onClick={() => appliquerStyle('textAlign', 'left')} />
              <Button icon={<AlignCenterOutlined />} onClick={() => appliquerStyle('textAlign', 'center')} />
              <Button icon={<AlignRightOutlined />} onClick={() => appliquerStyle('textAlign', 'right')} />
              <Select defaultValue="14px" style={{ width: 120 }} onChange={(value) => appliquerStyle('fontSize', value)}>
                <Option value="12px">12px</Option>
                <Option value="14px">14px</Option>
                <Option value="16px">16px</Option>
                <Option value="18px">18px</Option>
              </Select>
              <Input type="color" defaultValue="#000000" onChange={(e) => appliquerStyle('color', e.target.value)} />
            </div>
            <TextArea
              rows={10}
              value={brouillon.contenu}
              onChange={(e) => setBrouillon({ ...brouillon, contenu: e.target.value })}
              style={styleTexte}
            />
          </div>
        </Form.Item>
        
        {champsPersonnalises.map((champ, index) => (
          <Form.Item 
            key={index} 
            label={
              <Space>
                {editingLabel === index ? (
                  <Input
                    value={champ.label}
                    onChange={(e) => modifierChampPersonnalise(index, 'label', e.target.value)}
                    onPressEnter={() => toggleEditLabel(index)}
                    onBlur={() => toggleEditLabel(index)}
                    autoFocus
                    className="label-input-sans-bordure"
                  />
                ) : (
                  <>
                    {champ.label}
                    <Button 
                      icon={<EditOutlined />} 
                      size="small" 
                      onClick={() => toggleEditLabel(index)}
                    />
                  </>
                )}
              </Space>
            }
          >
            <Space>
              {champ.type ? (
                <>
                  <Input
                    placeholder="Valeur"
                    value={champ.value}
                    onChange={(e) => modifierChampPersonnalise(index, 'value', e.target.value)}
                    type={champ.type}
                    style={{ width: 680 }}
                  />
                  <Button icon={<EditOutlined />} onClick={() => reinitialiserTypeChamp(index)} />
                </>
              ) : (
                <Select
                  value={champ.type}
                  onChange={(value) => modifierChampPersonnalise(index, 'type', value)}
                  style={{ width: 723 }}
                >
                  <Option value="text">Texte</Option>
                  <Option value="number">Nombre</Option>
                  <Option value="date">Date</Option>
                </Select>
              )}
              <Button icon={<DeleteOutlined />} onClick={() => supprimerChampPersonnalise(index)} />
            </Space>
          </Form.Item>
        ))}
        
        <Form.Item>
          <Button type="dashed" onClick={ajouterChampPersonnalise} icon={<PlusOutlined />}>
            Ajouter un champ personnalisé
          </Button>
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button type="primary" icon={<SaveOutlined />}>Enregistrer</Button>
            <Button type="primary" icon={<SendOutlined />} onClick={publierBrouillon} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>Publier</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BrouillonsDetails;