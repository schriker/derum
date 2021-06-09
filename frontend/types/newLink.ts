import { MetadataQuery } from '../generated/graphql';

export type NewLinkProps = {
  setLinkMetadata: (metadata: MetadataQuery['metadata']) => void;
};

export type NewLinkMetadataProps = {
  metadata: MetadataQuery['metadata'];
  setLinkMetadata: (metadata: MetadataQuery['metadata'] | null) => void;
  closeModal: () => void;
};

export type NewLinkPreviewProps = {
  metadata: MetadataQuery['metadata'];
};

export type NewLinkInputs = {
  url: string;
};

export type NewLinkMetadataInputs = {
  roomId: number;
  title: string;
  photo: string;
  body: string;
  description: string;
};
